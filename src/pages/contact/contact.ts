import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  email:string;
  password:string;
  name:string;
  isLoggedIn: boolean = false;
  imageUrl = "";

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
  }


  presentPopover() {
    const popover = this.popoverCtrl.create('PopOverPage',{isLoggedIn: this.isLoggedIn});
    popover.present();
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then((resp) => {
    }).catch((err) => {
      alert("Nao foi possivel logar em nossos sistemas");
      console.log(err)
    })
  }
  ionViewWillEnter() {
    
    this.afAuth.authState.subscribe(user => {
      
      try {
        if(user.email) {
          
          this.email = user.email;
          const firestore = firebase.firestore();
          firestore.collection('Users').where("email", "==", this.email).get().then((snapshot) => {
            let count = 0;
            snapshot.forEach(doc => {
              count++;
              this.name = doc.data().name
              if(doc.data().image) {
                this.imageUrl = doc.data().image;
              }
              else {
                this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/tccwave.appspot.com/o/personImage.png?alt=media&token=29eb68fc-bc53-4f52-ad37-45d09306fbab";
              }
            })
            if(count == 0) {
              this.afAuth.auth.signOut().then((resp) => {
                alert("Voce não conseguiu se logar");
                this.isLoggedIn = false;
              })
            }
            else {
              this.isLoggedIn = true;
            }
            
            
          }).catch((err) => {
            console.log(err)
          })
          
        }
        else {
          this.isLoggedIn = false;
        }
      }
      catch {
        this.isLoggedIn = false;
      }
    })
  }

  cadFunc(){
    this.navCtrl.push('CadastroPage');
  }

  cadFicha(){
    this.navCtrl.push('CadastrofichaPage');
  }

  almoxarifado(){
    this.navCtrl.push('AlmoxarifadoPage');
  }

  perfil(){
    this.navCtrl.push('PerfilPage');
  }


}
