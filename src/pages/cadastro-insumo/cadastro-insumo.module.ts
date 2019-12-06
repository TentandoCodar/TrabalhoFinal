import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroInsumoPage } from './cadastro-insumo';

@NgModule({
  declarations: [
    CadastroInsumoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroInsumoPage),
  ],
  exports: [
    CadastroInsumoPage
  ]
})
export class CadastroInsumoPageModule {}
