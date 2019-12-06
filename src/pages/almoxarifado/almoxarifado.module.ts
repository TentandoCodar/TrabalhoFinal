import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlmoxarifadoPage } from './almoxarifado';

@NgModule({
  declarations: [
    AlmoxarifadoPage,
  ],
  imports: [
    IonicPageModule.forChild(AlmoxarifadoPage),
  ],
  exports: [
    AlmoxarifadoPage
  ]
})
export class AlmoxarifadoPageModule {}
