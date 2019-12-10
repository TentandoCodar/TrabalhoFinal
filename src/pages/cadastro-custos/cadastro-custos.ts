import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';

/**
 * Generated class for the CadastroCustosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-custos',
  templateUrl: 'cadastro-custos.html',
})
export class CadastroCustosPage {
  withdrawal:number;
  comissions:number;
  financialExpenses:number;
  administrativeExpenses:number;
  fixedCosts:number;
  freight:number;
  investment:number;
  miscellaneousExpenses:number;
  operationalExpenses:number;
  profitMargin:number;
  theft:number;
  total:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const firestore = firebase.firestore();

    firestore.collection('Costs').doc('kJEJcageHISuAcRqBVnB').get().then((resp) => {
      const data = resp.data();
      
    }).catch((err) => {
      console.log(err);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroCustosPage');
  }


  push(){
    this.navCtrl.push(TabsPage);  
  }
}
