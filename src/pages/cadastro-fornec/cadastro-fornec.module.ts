import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroFornecPage } from './cadastro-fornec';

@NgModule({
  declarations: [
    CadastroFornecPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroFornecPage),
  ],
  exports: [
    CadastroFornecPage
  ]
})
export class CadastroFornecPageModule {}
