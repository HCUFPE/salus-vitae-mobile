import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesMedicamentoPage } from './detalhes-medicamento';

@NgModule({
  declarations: [
    DetalhesMedicamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesMedicamentoPage),
  ],
})
export class DetalhesMedicamentoPageModule {}
