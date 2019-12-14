import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
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
  searching: boolean = false;
  searchPlaceholder: string;


  selected: string[] = ["selected","","",""];


  collection = "";
  searchWhere:string = "";
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
    console.log('classToList', navParams.get('classToList'));
    this.classToList = navParams.get('classToList');

    switch(this.classToList) {
      case 'CadastroFuncPage' : {
        this.title = 'Funcionários';
        this.collection = "Users";
        this.searchPlaceholder = "nome";
        this.searchWhere = "name";
        break;
      }case 'CadastroFichaPage' : {
        this.title = 'Fichas';
        this.collection = "Datasheet";
        this.searchPlaceholder = "código";
        this.searchWhere = "code";
        break;
      }case 'CadastroInsumoPage' : {
        this.title = 'Insumos';
        this.collection = "Products";
        this.searchPlaceholder = "nome";
        this.searchWhere = "name";
        break;
      }case 'CadastroLojasPage' : {
        this.title = 'Franquias';
        this.collection = "Clients";
        this.searchPlaceholder = "nome";
        this.searchWhere = "name";
        break;
      }case 'CadastroFornecPage' : {
        this.title = 'Fornecedores';
        this.collection = "Providers";
        this.searchPlaceholder = "nome";
        this.searchWhere = "name";
        break;
      }default: {
        this.title = 'Undefined';

        break;
      }
    }
    this.getData();

  }

  searchWhereButtons(who: string, where, placeholder :string){
    this.searchWhere = where;
    for(let i in this.selected){
      if(who == i){
        this.selected[i] = "selected";
      }else{
        this.selected[i] = "";
      }
    }
    this.searchPlaceholder = placeholder;
  }

  getData() {

    const firestore = firebase.firestore();

    if(this.collection) {
      firestore.collection(this.collection).onSnapshot((snapshot) => {
        this.data = [];

        snapshot.forEach(doc => {
          console.log(doc.data());
          this.data.push(doc.data());
        })




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
     this.searchTermDisplay = `"${this.searchTerm.substring(0,17)}..."`;
   }
   else {
     this.searchTermDisplay = `"${this.searchTerm}"`;
   }

 }

 getTypeOfReturn() {
   if(this.collection == "Providers") {
     this.searchWhere = "email";
     return "Type 1";
   }

   else if(this.collection == "Users") {
    this.searchWhere = "email";
    return "Type 2";
   }

   else if(this.collection == "Datasheet") {
    this.searchWhere = "code";
    return "Type 3";
   }

   else if(this.collection == "Products") {
    this.searchWhere = "name";
    return "Type 4";
   }

   else if(this.collection == "Clients") {
    this.searchWhere = "email";
    return "Type 5";
  }
  

 }
 search(term, where = "email") {
  console.log(this.collection)
  const firestore = firebase.firestore();
  console.log(this.searchWhere)
  try {
    firestore.collection(this.collection).orderBy(this.searchWhere).startAt(this.searchTerm).endAt(this.searchTerm+'\uf8ff').onSnapshot((snapshot) => {
      this.data = [];
      snapshot.forEach(doc => {
  
        this.data.push(doc.data());
      })
    })
  }catch {

  }

  if(this.searching == false){
    this.searching = true;
  }else{
    this.searching = false;
  }
  
 }

 clear(){
   this.searchTerm = "";
   this.search("",this.searchWhere);
 }

 searchMode(){
  this.searching = false;
}


 getWhereOfSearch() {

 }
 delete(id) {
  const firestore = firebase.firestore();
  if(this.collection == "Users"){
    return null;
  }
  else {
    firestore.collection(this.collection).doc(id).delete();
  }
 }


}
