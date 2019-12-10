import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CadastroFichaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-ficha',
  templateUrl: 'cadastro-ficha.html',
})
export class CadastroFichaPage {
  clients:{id, name, code, phone}[] = [];
  firestore;
  clientCode = "";
  clientPhone = "";
  clientIndex:number = 0;
  seal1:string;
  seal2:string;
  seal3:string;
  date:string;
  modelist:string;
  productAmount:number;
  productAmountArray:any = [];
  observations:string;
  productionAmount:string;
  laborCust:number;
  priceCust:number;
  standartDivisor:number;
  salePrice:number;
  products:{id,name}[] = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.date = new Date().toLocaleDateString('pt-BR');
    this.firestore = firebase.firestore();
    this.firestore.collection('Clients').onSnapshot((snapshot) => {
      this.clients = [];
      let count = 0;
      snapshot.forEach(doc => {
        this.clients.push({id:count, name:doc.data().name, code: doc.data().code, phone: doc.data().phone})
        count++;
      })

      this.clientCode = this.clients[0].code;
      this.clientPhone = this.clients[0].phone;

    })

    this.firestore.collection('Products').onSnapshot((snapshot) => {
      this.products = [];
     
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(data.code)
        //this.products.push({id:data.code, name:data.name})
      })

      

      

    })
  }

  ionViewDidLoad() {

  }

  onProductAmountChange() {
    this.productAmountArray.push(1);
    
    
  }


  push(){
    this.viewCtrl.dismiss();
  }

  changeClient() {
    this.clientCode = this.clients[this.clientIndex].code;
    this.clientPhone = this.clients[this.clientIndex].phone;
  }

  signUp() {
    
  }
}
