import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AlmoxarifadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-almoxarifado',
  templateUrl: 'almoxarifado.html',
})
export class AlmoxarifadoPage {

  chartPoints: string = '\"00,100 20,6 40,8 60,0 80,8 100,0 120,0 140,00 160,0 180,0 200,110 220,10 240,70 260,100 280,100 300,40 320,0 340,100 360,100 380,120 400,60 420,70 440,80\"'


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlmoxarifadoPage');
  }


  push(){
    this.navCtrl.push(TabsPage);
  }


}
