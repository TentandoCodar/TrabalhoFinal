import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import 'firebase/firestore';
import firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {


  itemID: string;
  ProductName: string;
  OwnerName: string;
  Image_URL: string;
  Price: string;
  Description: string;
  OwnerEmail: string;
  Date: string;
  OwnerImage: string;

  
  price:number;
  modelist:number;
  Key: string;
  firestore:any;
  image1:string;
  image2:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.itemID = navParams.get('itemID');
    this.firestore = firebase.firestore();
    this.firestore.collection("Datasheet").doc(this.itemID).get().then(resp => {
      const data = resp.data();
      this.ProductName = data.description;
      this.price = data.salePrice;
      this.modelist = data.modelist;
      this.image1 = data.image1;
      this.image2 = data.image2;
      
    }).catch((err) => {

    })
    //  this.Key = navParams.get('Key');
    //  console.log(navParams.get('Key'))
    //  this.ProductName = navParams.get('ProductName');
    //  this.OwnerName = navParams.get('OwnerName');
    //  this.Image_URL = navParams.get('Image_URL');
    //  this.precocru = parseFloat(navParams.get('Price'));
    //  this.Price = `R$`+this.precocru.toFixed(2);
    //  console.log( this.Price, this.precocru);
    //  this.Description = navParams.get('Description');
    //  this.OwnerEmail = navParams.get('OwnerEmail');
    //  this.Date = navParams.get('Date');
    //  this.OwnerImage = navParams.get('OwnerImage')


       console.log('ionViewDidLoad ItemPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }


  
  push(){
    this.viewCtrl.dismiss();
  }



}
