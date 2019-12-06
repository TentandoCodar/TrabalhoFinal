import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroFichaPage } from './cadastro-ficha';

@NgModule({
  declarations: [
    CadastroFichaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroFichaPage),
  ],
})
export class CadastroFichaPageModule {}
