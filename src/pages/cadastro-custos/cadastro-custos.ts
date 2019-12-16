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
  withdrawal:any;
  comissions:any;
  financialExpenses:any;
  administrativeExpenses:any;
  fixedCosts:any;
  freight:any;
  investment:any;
  miscellaneousExpenses:any;
  operationalExpenses:any;
  profitMargin:any;
  theft:any;
  total:any;
  charge:any;
  chargePercentage:any;
  paymentSheetBrute:any;
  laborCostBrute:any;
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
        this.total = (
          parseFloat(this.administrativeExpenses) +
          parseFloat(this.comissions) +
          parseFloat(this.operationalExpenses) + 
          parseFloat(this.theft) +
          parseFloat(this.freight) +
          parseFloat(this.fixedCosts) +
          parseFloat(this.profitMargin) +
          parseFloat(this.investment) +
          parseFloat(this.financialExpenses) +
          parseFloat(this.miscellaneousExpenses) + 
          parseFloat(this.withdrawal)
        );
        this.chargePercentage = data.ChargePercentage;
        this.paymentSheetBrute = data.PaymentSheetBrute;
        this.charge = this.paymentSheetBrute * (this.chargePercentage / 100);
        
        
        this.laborCostBrute  = parseFloat(this.paymentSheetBrute) + parseFloat(this.charge);
      })
    })
  }

  ionViewDidLoad() {
  }

  update() {
    const firestore = firebase.firestore();
    this.charge = this.paymentSheetBrute * (this.chargePercentage / 100);
    this.laborCostBrute  = this.paymentSheetBrute + this.charge;
    this.total = (
      parseFloat(this.administrativeExpenses) +
      parseFloat(this.comissions) +
      parseFloat(this.operationalExpenses) + 
      parseFloat(this.theft) +
      parseFloat(this.freight) +
      parseFloat(this.fixedCosts) +
      parseFloat(this.profitMargin) +
      parseFloat(this.investment) +
      parseFloat(this.financialExpenses) +
      parseFloat(this.miscellaneousExpenses) + 
      parseFloat(this.withdrawal)
    );
    firestore.collection('Costs').doc("kJEJcageHISuAcRqBVnB").update({
      AdministrativeExpenses: this.administrativeExpenses,
      Comissions: this.comissions,
      OperationalExpenses: this.operationalExpenses,
      Theft: this.theft,
      Transportation: this.freight,
      total:this.total,
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
