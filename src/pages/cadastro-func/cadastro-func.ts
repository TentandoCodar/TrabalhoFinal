import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {ListPage} from '../list/list';
/**
 * Generated class for the CadastroFuncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-func',
  templateUrl: 'cadastro-func.html',
})
export class CadastroFuncPage {
  email:string;
  password:string;
  name:string;
  code:string;
  state:string;
  firestore:any;
  thisEmail:string;
  thisPassword:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.code = navParams.get('itemId');
    this.firestore = firebase.firestore();
    this.thisEmail = this.afAuth.auth.currentUser.email;
    
    if(this.code) {
      
      this.state = "edit";
      this.firestore.collection('Users').doc(this.code).get().then((resp) => {
        
        const data = resp.data();

        this.email = data.email;
        this.name = data.name;
      })
    }
    else {
      this.state = "create";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroFuncPage');
  }


  push(){
    this.viewCtrl.dismiss();
  }

  signUp() {
    if(this.state !== "edit") {
    
      this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password).then((resp:any) => {
        this.afAuth.auth.currentUser.sendEmailVerification();
        this.firestore.collection("Users").add({
          email:this.email,
          name:this.name,
          code:"",
        }).then((resp) => {
          this.firestore.collection("Users").doc(resp.id).set({
            email:this.email,
            name:this.name,
            code:resp.id,
          }).then(() => {
            this.afAuth.auth.signInWithEmailAndPassword(this.thisEmail, this.thisPassword).then((resp) => {

            }).catch((err) => {
              alert("Ocorreu um erro")
            })
          })
        }).catch((err) => {

        })
      }).catch((err) => {
        
      })
    }
    else {
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((resp) => {
        this.firestore.collection("Users").doc(this.code).update({
          email:this.email,
          name:this.name,
          code:this.code
        }).then((resp) => {
          
        }).catch((err) => {

        })
      })
    }
    this.navCtrl.push(ListPage, {classToList: "CadastroFuncPage"});
  }
  






  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar identidade',
      inputs: [
        {
          name: 'autentication',
          placeholder: 'Confirme sua senha',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: data => {
            if ( 1 == 1 ) {
              this.thisPassword = data;
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }


  
}
