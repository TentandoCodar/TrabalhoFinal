import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
import {ListPage} from '../list/list';
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
  code:string;
  firestore:any;
  state:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.firestore = firebase.firestore();
    this.code = navParams.get('itemId');
    this.firestore.collection('Providers').onSnapshot((snapshot) => {
      this.providers = [];
      let count = 0;
      snapshot.forEach(doc => {

        this.providers.push({id:count, name:doc.data().name, code: doc.data().code})
        count++;
      })

      if(!this.code) {
        this.providerCode = this.providers[0].code;
      }


    })

    if(this.code) {
      this.state = "edit";
      this.firestore.collection('Products').doc(this.code).get().then((resp) => {
        const data = resp.data();

        this.description = data.name;
        this.unity = data.unity;
        this.price = data.price;
        this.providerCode = data.providerCode;
      }).catch((err) => {
        
      })
    }
    else {
      this.state = "create";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroInsumoPage');
  }
  changeProvider() {
    console.log("sadsajoisadjiosa")
    this.providerCode = this.providers[this.providerId].code;
    

  }

  signUpProduct() {
    const firestore = firebase.firestore();
    let description = this.description;
    let unity = this.unity;
    let price = this.price;
    let providerCode = this.providerCode;

    if(this.state != 'edit') {
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
    else {
      firestore.collection('Products').doc(this.code).set({
        name:description,
        unity,
        price,
        providerCode,
        code:this.code
      }).then(() => {
        this.unity = "";

        this.price = 0;
        this.description = "";
      }).catch(() => {
        console.log("Error")
      })
    }

    this.navCtrl.push(ListPage, {classToList: "CadastroInsumoPage"});
  }

  push(){
    this.viewCtrl.dismiss();
  }
}
