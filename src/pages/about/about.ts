import { Component } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  searchTerm:string = "";
  searchActive: boolean = false;

  constructor(public modalCtrl: ModalController,public navCtrl: NavController) {

  }

  

  search() {

 
  }



  pushItem(itemID: string){
    let itemModal = this.modalCtrl.create('ItemPage',{ itemID: itemID })
    itemModal.present();
  }

}
