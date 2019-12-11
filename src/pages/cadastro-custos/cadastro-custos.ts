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
  charge:number;
  chargePercentage:number;
  paymentSheetBrute:number;
  laborCostBrute:number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const firestore = firebase.firestore();
    
    firestore.collection('Costs').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        this.administrativeExpenses = data.AdministrativeExpenses;
        this.comissions = data.Comissions;
        this.operationalExpenses = data.OperationalExpenses;
        this.theft = data.Theft;
        this.freight = data.Transportation;
        this.fixedCosts = data.FixedCosts;
        this.profitMargin = data.ProfitMargin;
        this.investment = data.Investments;
        this.financialExpenses = data.FinancialExpenses;
        this.miscellaneousExpenses = data.DiverseExpenses;
        this.withdrawal = data.Withdraw;
        this.charge = data.Charge;
        this.chargePercentage = data.ChargePercentage;
        this.paymentSheetBrute = data.PaymentSheetBrute;
        this.laborCostBrute  = data.LaborCostBrute;
      })
    })
  }

  ionViewDidLoad() {
  }


  push(){
    this.navCtrl.push(TabsPage);  
  }
}
