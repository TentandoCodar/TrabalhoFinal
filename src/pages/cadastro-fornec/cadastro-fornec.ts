import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CadastroFornecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-fornec',
  templateUrl: 'cadastro-fornec.html',
})
export class CadastroFornecPage {
  email:string;
  name:string;
  cnpj:number;
  phone:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroFornecPage');
  }

  signUpProvider() {
    const firestore = firebase.firestore();
    let email = this.email;
    let name = this.name;
    let cnpj = this.cnpj;
    let phone = this.phone;
    firestore.collection('Providers').add({
      email,
      name,
      cnpj,
      phone
    }).then((resp) => {
      firestore.collection('Providers').doc(resp.id).set({
        email,
        name,
        cnpj,
        phone,
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
