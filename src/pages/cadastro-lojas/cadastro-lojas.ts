import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
import {ListPage} from '../list/list';
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
  code:string;
  firestore:any;
  state:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.code = navParams.get('itemId');
    this.firestore = firebase.firestore();
    if(this.code) {
      this.state = "edit";
      this.firestore.collection('Clients').doc(this.code).get().then((resp) => {
        const data = resp.data();

        this.email = data.email;
        this.name = data.name;
        this.phone = data.phone;
        this.cnpj = data.cnpj;
      })
    }
    else {
      this.code = "create";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroLojasPage');
  }

  signUpClient() {
    const name = this.name;
    const email = this.email;
    const phone = this.phone;
    const cnpj = this.cnpj;

    const firestore = this.firestore

    if(this.state != 'edit') {
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
    else {
      firestore.collection('Clients').doc(this.code).set({
          name,
          email,
          phone,
          cnpj,
          code:this.code
        }).then((resp) => {
  
        }).catch((err) => {
  
        })
    }

    this.navCtrl.push(ListPage, {classToList: "CadastroLojasPage"});
  }

  push(){
    this.viewCtrl.dismiss();
  }
}
