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
    
    this.getData();
    
  }

  getData() {
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
        this.chargePercentage = data.ChargePercentage;
        this.paymentSheetBrute = data.PaymentSheetBrute;
        this.charge = this.paymentSheetBrute * (this.chargePercentage / 100);
        
        
        this.laborCostBrute  = this.paymentSheetBrute + this.charge;
      })
    })
  }

  ionViewDidLoad() {
  }

  update() {
    const firestore = firebase.firestore();
    this.charge = this.paymentSheetBrute * (this.chargePercentage / 100);
    this.laborCostBrute  = this.paymentSheetBrute + this.charge;
    firestore.collection('Costs').doc("kJEJcageHISuAcRqBVnB").update({
      AdministrativeExpenses: this.administrativeExpenses,
      Comissions: this.comissions,
      OperationalExpenses: this.operationalExpenses,
      Theft: this.theft,
      Transportation: this.freight,
      FixedCosts: this.fixedCosts,
      ProfitMargin: this.profitMargin,
      Investments: this.investment,
      FinancialExpenses: this.financialExpenses,
      DiverseExpenses: this.miscellaneousExpenses,
      Withdraw: this.withdrawal,
      PaymentSheetBrute: this.paymentSheetBrute,
      ChargePercentage: this.chargePercentage,
      Charge: this.charge,
      laborCostBrute: this.laborCostBrute,
    }).then((resp) => {

    }).catch((resp) => {

    })
  }

  push(){
    this.navCtrl.push(TabsPage);  
  }
}
