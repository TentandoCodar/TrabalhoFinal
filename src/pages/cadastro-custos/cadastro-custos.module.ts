import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroCustosPage } from './cadastro-custos';

@NgModule({
  declarations: [
    CadastroCustosPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroCustosPage),
  ],
  exports: [
    CadastroCustosPage
  ]
})
export class CadastroCustosPageModule {}
