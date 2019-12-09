import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CadastroLojasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-lojas',
  templateUrl: 'cadastro-lojas.html',
})
export class CadastroLojasPage {
  name:string;
  email:string;
  phone:number;
  cnpj:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroLojasPage');
  }

  signUpClient() {
    const name = this.name;
    const email = this.email;
    const phone = this.phone;
    const cnpj = this.cnpj;

    const firestore = firebase.firestore();

    firestore.collection('Clients').add({
      name,
      email,
      phone,
      cnpj
    }).then((resp) => {
      firestore.collection('Clients').doc(resp.id).set({
        name,
        email,
        phone,
        cnpj,
        code:resp.id
      }).then((resp) => {

      }).catch((err) => {

      })
    }).catch((err) => {
      
    })
  }

  push(){
    this.navCtrl.push(TabsPage);
  }
}
