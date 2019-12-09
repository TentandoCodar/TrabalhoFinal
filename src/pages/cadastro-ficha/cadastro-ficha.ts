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
  clients = [{}];
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
  productionAmount:string;
  laborCust:number;
  priceCust:number;
  standartDivisor:number;
  salePrice:number;
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
  }

  ionViewDidLoad() {

  }


  push(){
    this.viewCtrl.dismiss();
  }

  changeClient() {
    this.clientCode = this.clients[this.clientIndex].code;
    this.clientPhone = this.clients[this.clientIndex].phone;
  }

  signUp() {
    let clientCode = this.clientCode;
    let clientPhone = this.clientPhone;
    let seal1 = this.seal1;
    let seal2 = this.seal2;
    let seal3 = this.seal3;
    let date = this.date;
    let modelist = this.modelist;
    let productAmount = this.productAmount;
    let observations = this.observations;
    let productionAmount = this.productionAmount;
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
      code: "",
    }).then((resp) => {
      this.firestore.collection('Datasheet').doc(resp.id).set({
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
        code: resp.id,
      }).then((resp) => {
        console.log("Cadastrado")
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}
