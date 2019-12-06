import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController) { }

    presentPopover() {
      const popover = this.popoverCtrl.create('PopOverPage');
      popover.present();
    }

    


    homeCardClick(type: string,spec: string){

      switch(type){
        case "colection": {
            this.navCtrl.push(TabsPage,{TabRoot: type, Spec: spec});
            break;
         }
         case "product": {
            this.navCtrl.push(TabsPage,{TabRoot: spec});
            break;
         }
         default: {

            break;
         }
            }
    }


}
