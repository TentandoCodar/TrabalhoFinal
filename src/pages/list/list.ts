import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    console.log('classToList', navParams.get('classToList'));
    this.classToList = navParams.get('classToList');

    switch(this.classToList) {
   case 'CadastroFuncPage' : {
     this.title = 'Funcionários';
      break;
   }case 'CadastroFichaPage' : {
     this.title = 'Fichas';
      break;
   }case 'CadastroInsumoPage' : {
     this.title = 'Insumos';
      break;
   }case 'CadastroLojasPage' : {
     this.title = 'Franquias';
      break;
   }case 'CadastroFornecPage' : {
     this.title = 'Fornecedores';
      break;
   }default: {
     this.title = 'Undefined';
      break;
   }
}

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }


  cadModal(itemClass:string, itemId: string) {
   let profileModal = this.modalCtrl.create(this.classToList, { itemId: itemId });
   profileModal.present();
 }

 pesquisa: string = '';


 getItems(ev: any) {
   if(ev.target.value.length >= 20) {
     this.pesquisa = ('\" ' + ev.target.value.substring(0, 17) + '...' + '\ "');
   }else{
       this.pesquisa = ('\" ' + ev.target.value + '\ "') ;
   }

 }
}
