import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  itemClass: string = 'none';
  classToList: string = 'none';
  title: string = 'Undefined';
  searchTerm:string = "";
  searchTermDisplay = "";
  data = [];
  collection = "";
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    console.log('classToList', navParams.get('classToList'));
    this.classToList = navParams.get('classToList');
    const firestore = firebase.firestore();
    switch(this.classToList) {
      case 'CadastroFuncPage' : {
        this.title = 'Funcionários';
        this.collection = "Users";
        break;
      }case 'CadastroFichaPage' : {
        this.title = 'Fichas';
        this.collection = "Files";
        break;
      }case 'CadastroInsumoPage' : {
        this.title = 'Insumos';
        this.collection = "Products";
        break;
      }case 'CadastroLojasPage' : {
        this.title = 'Franquias';
        this.collection = "Clients";
        break;
      }case 'CadastroFornecPage' : {
        this.title = 'Fornecedores';
        this.collection = "Providers";
        break;
      }default: {
        this.title = 'Undefined';
        
        break;
      }
    }
    if(this.collection) {
      firestore.collection(this.collection).onSnapshot((snapshot) => {
      
      
        snapshot.forEach(doc => {
  
          this.data.push(doc.data());
        })
  
        
        console.log(this.data);
  
      })
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }


  back(){
    this.navCtrl.push(TabsPage);
  }

  showModal(itemClass:string, collection:string = "", itemId:string = "") {
   let profileModal = this.modalCtrl.create(this.classToList, { itemId: itemId, collection: collection });
   profileModal.present();
 }

 pesquisa: string = '';


 getItems() {
   console.log(this.searchTerm)
   if(this.searchTerm.length >= 20) {
     this.searchTermDisplay = `${this.searchTerm.substring(0,17)}...`; 
   }
   else {
     this.searchTermDisplay = this.searchTerm;
   }

 }

 getTypeOfReturn() {
   if(this.collection == "Providers" || this.collection == "Clients") {
     return "Type 1";
   }

   else if(this.collection == "Users") {
    return "Type 2";
   }
   
   else if(this.collection == "Files") {
    return "Type 3";
   }

   else if(this.collection == "Products") {
     return "Type 4";
   }

 }

 
}
