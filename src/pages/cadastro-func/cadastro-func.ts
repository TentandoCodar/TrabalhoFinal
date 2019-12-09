import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the CadastroFuncPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-func',
  templateUrl: 'cadastro-func.html',
})
export class CadastroFuncPage {
  email:string;
  password:string;
  name:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroFuncPage');
  }


  push(){
    this.navCtrl.push(TabsPage);
  }

  signUp() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.password).then((resp:any) => {
      
    }).catch((err) => {

    })
  }
}
