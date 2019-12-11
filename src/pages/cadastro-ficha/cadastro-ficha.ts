import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
import { threadId } from 'worker_threads';

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
  code:string = "";
  description:string = "";
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
  observations:string;
  hourAmount:number;
  laborCust:number;
  priceCust:number;
  standartDivisor:number;
  salePrice:number;
  products:{id,name, price}[] = [];
  productsIndexes = [];
  productsArray = [];
  materialCost:number = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.date = new Date().toLocaleDateString('pt-BR');
    this.firestore = firebase.firestore();
    this.code = navParams.get('itemId');
    let sc = this.code != "";

    console.log(sc)
    if(!this.code) {
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
          this.products.push({id:data.code, name:data.name, price: data.price})
        })
  
        
  
      })
    }
    else {
      this.firestore.collection('Datasheet').doc(this.code).get().then((snapshot) => {
        const data = snapshot.data();
        this.clientCode = data.clientCode;
        this.clientPhone = data.clientPhone;
        this.seal1 = data.seal1;
        this.seal2 = data.seal2;
        this.seal3 = data.seal3;
        this.modelist = data.modelist;
        this.productAmount = data.productAmount;
        this.observations = data.observations;
        
        this.description = data.description;
      })
      
    }
    
  }

  ionViewDidLoad() {

  }

  setProductAmount() {
    this.productsArray = [];
    this.productsIndexes = [];
    for(let i = 0;i < this.productAmount; i++) {
      this.productsArray.push(i);
      this.productsIndexes.push("");
    }
    console.log(this.productsArray)
  }

  printArray() {
    
  }

  push(){
    this.viewCtrl.dismiss();
  }

  changeClient() {
    this.clientCode = this.clients[this.clientIndex].code;
    this.clientPhone = this.clients[this.clientIndex].phone;
  }

  changeLaborHour(term) {
    console.log(term)
    this.laborCust = this.hourAmount * 13
  }

  signUp() {
    this.products.forEach(value => {
      
      this.materialCost += parseFloat(value.price);
    })
    
    /*let clientCode = this.clientCode;
    let clientPhone = this.clientPhone;
    let seal1 = this.seal1;
    let seal2 = this.seal2;
    let seal3 = this.seal3;
    let date = this.date;
    let modelist = this.modelist;
    let productAmount = this.productAmount;
    let observations = this.observations;
    let laborCust = this.laborCust;
    let priceCust = this.priceCust;
    let standartDivisor = this.standartDivisor;
    let salePrice = this.salePrice;
    this.firestore.collection("Datasheet").add({
      clientCode,
      clientPhone,
      seal1,
      seal2,
      seal3,
      date,
      modelist,
      productAmount,
      observations,
      productionAmount,
      laborCust,
      priceCust,
      standartDivisor,
      salePrice,
      rawMaterial: this.productsIndexes,
    })*/
      
  }
}

