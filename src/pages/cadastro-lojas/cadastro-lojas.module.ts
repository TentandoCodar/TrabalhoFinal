import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroLojasPage } from './cadastro-lojas';

@NgModule({
  declarations: [
    CadastroLojasPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroLojasPage),
  ],
  exports: [
    CadastroLojasPage
  ]
})
export class CadastroLojasPageModule {}
