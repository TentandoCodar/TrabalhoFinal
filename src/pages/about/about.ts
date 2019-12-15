import { Component } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';
import firebase from 'firebase';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  selected: string[] = ["","","","","","","","",""];

  searchTerm:string = "";
  searchActive: boolean = false;
  productData = [];
  firestore:any;
  searching: boolean = false;
  searchType: any;
  searchPlaceholder: string = "Pesquisar";
  hasFilter: boolean = false;
  

  constructor(public modalCtrl: ModalController,public navCtrl: NavController) {
    this.firestore = firebase.firestore();
    this.getData();
  }

  getData(type = "", term = "") {
    if(term) {
      this.firestore.collection("Datasheet").orderBy('name').startAt(term).endAt(term+'\uf8ff').onSnapshot(snapshot => {
        this.productData = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          data.salePrice = parseFloat(data.salePrice);
          data.salePrice = data.salePrice.toFixed(2);
          this.productData.push(data);
          
        });
      })
    }
    else {
      if(type) {
        this.firestore.collection("Datasheet").where('type', '==', type).onSnapshot(snapshot => {
          this.productData = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            data.salePrice = parseFloat(data.salePrice);
            data.salePrice = data.salePrice.toFixed(2);
            this.productData.push(data);
            
          });
        })
      }
      else {
        this.firestore.collection("Datasheet").onSnapshot(snapshot => {
          this.productData = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            data.salePrice = parseFloat(data.salePrice);
            data.salePrice = data.salePrice.toFixed(2);
            this.productData.push(data);
            
          });
        })
      }
    }
  }

  

  search(type, term) {

    if(this.searching == false){
      this.searching = true;
    }else{
      this.searching = false;
    }
   
    this.getData(this.searchType, this.searchTerm)
 }

 clear(){
   this.searchTerm = "";
   this.search("","");
 }

 searchMode(){
  this.searching = false;
}
searchWhereButtons(who: string, where, placeholder :string){
  this.searchType = where;
  for(let i in this.selected){
    if(who == i){
      if(who == i && this.selected[i] == "selected"){
        this.selected[i] = "";
        this.searchType = "";
        this.searchPlaceholder = "Pesquisar";
        this.hasFilter = false;
      }else{
        this.selected[i] = "selected";
        this.searchPlaceholder = ("Pesquisando em " + placeholder);
        this.hasFilter = true;
      }
    }else{
      this.selected[i] = "";
    }

    
  }
  this.getData(this.searchType, this.searchTerm)
  // this.searchPlaceholder = placeholder;
}


  pushItem(itemID: string){
    let itemModal = this.modalCtrl.create('ItemPage',{ itemID: itemID })
    itemModal.present();
  }

}
