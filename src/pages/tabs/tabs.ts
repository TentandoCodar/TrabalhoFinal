import { Component, ViewChild } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  TabRoot: number = 0;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  // @ViewChild('myTabs') tabRef: Tabs;


  constructor(public navParams: NavParams) {


    if(navParams.get('Spec')){
      this.TabRoot = 1;
      console.log(navParams.get('Spec'), this.TabRoot);
    }

  }







}
