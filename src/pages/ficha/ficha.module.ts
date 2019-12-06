import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FichaPage } from './ficha';

@NgModule({
  declarations: [
    FichaPage,
  ],
  imports: [
    IonicPageModule.forChild(FichaPage),
  ],
  exports: [
    FichaPage
  ]
})
export class FichaPageModule {}
