import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DetalhesPacientePage } from './detalhes-paciente';

@NgModule({
  declarations: [
    DetalhesPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesPacientePage),
  ],
})
export class DetalhesPacientePageModule {}
