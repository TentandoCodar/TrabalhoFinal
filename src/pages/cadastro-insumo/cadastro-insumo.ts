import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CadastroInsumoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-insumo',
  templateUrl: 'cadastro-insumo.html',
})
export class CadastroInsumoPage {
  description:string;
  unity:string;
  price:number;
  providers:{id,name,code}[] = [];
  providerId:number;
  providerCode:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    const firestore = firebase.firestore();
    
    firestore.collection('Providers').onSnapshot((snapshot) => {
      this.providers = [];
      let count = 0;
      snapshot.forEach(doc => {

        this.providers.push({id:count, name:doc.data().name, code: doc.data().code})
        count++;
      })

      this.providerCode = this.providers[0].code;


    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroInsumoPage');
  }
  changeProvider() {
    this.providerCode = this.providers[this.providerId + 1].code;
    

  }

  signUpProduct() {
    const firestore = firebase.firestore();
    let description = this.description;
    let unity = this.unity;
    let price = this.price;
    let providerCode = this.providerCode;

    firestore.collection('Products').add({
      description,
      unity,
      price,
      providerCode
    }).then((resp) => {
      firestore.collection('Products').doc(resp.id).set({
        name:description,
        unity,
        price,
        providerCode,
        code:resp.id
      }).then(() => {
        this.unity = "";

        this.price = 0;
        this.description = "";
      }).catch(() => {
        console.log("Error")
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  push(){
    this.viewCtrl.dismiss();
  }
}
