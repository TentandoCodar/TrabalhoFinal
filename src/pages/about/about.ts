import { Component } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';
import firebase from 'firebase';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  searchTerm:string = "";
  searchActive: boolean = false;
  productData = [];
  firestore:any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController) {
    this.firestore = firebase.firestore();
    this.getData();
  }

  getData() {
    this.firestore.collection("Datasheet").onSnapshot(snapshot => {
      this.productData = [];
      snapshot.forEach(doc => {
        this.productData.push(doc.data());
        
      });
    })
  }

  

  search() {

 
  }



  pushItem(itemID: string){
    let itemModal = this.modalCtrl.create('ItemPage',{ itemID: itemID })
    itemModal.present();
  }

}
