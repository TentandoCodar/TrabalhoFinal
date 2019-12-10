import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
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
  code:string;
  collection:string;
  state:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, ) {
    this.code = navParams.get('itemId');
    const firestore = firebase.firestore();

    if(this.code) {
      this.state = "edit";
      firestore.collection("Providers").doc(this.code).get().then(snapshot => {
        const data = snapshot.data();
        this.email = data.email;
        this.name = data.name;
        this.cnpj = data.cnpj;
        this.phone = data.phone;
      })
    }
    else {
      this.state = "create";
    }
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
    if(this.state !== "edit") {
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
    else {
      firestore.collection('Providers').doc(this.code).set({
        email,
        name,
        cnpj,
        phone,
        code:this.code
      }).then((resp) => {

      }).catch((err) => {

      })
    }
  }

  push(){
    this.viewCtrl.dismiss();
  }
}
