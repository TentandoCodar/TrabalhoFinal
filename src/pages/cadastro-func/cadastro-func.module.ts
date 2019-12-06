import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroFuncPage } from './cadastro-func';

@NgModule({
  declarations: [
    CadastroFuncPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroFuncPage),
  ],
  exports: [
    CadastroFuncPage
  ]
})
export class CadastroFuncPageModule {}
