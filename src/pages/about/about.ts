import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

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
