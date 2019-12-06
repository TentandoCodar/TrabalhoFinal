import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  email:string;
  password:string;
  isLoggedIn: boolean = false;

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
  }


  presentPopover() {
    const popover = this.popoverCtrl.create('PopOverPage',{isLoggedIn: this.isLoggedIn});
    popover.present();
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.password).then((resp) => {
      console.log("Deu boa")
    }).catch((err) => {
      alert("Nao foi possivel logar em nossos sistemas");
      console.log(err)
    })
  }

  logout(){
    this.isLoggedIn = false;
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
