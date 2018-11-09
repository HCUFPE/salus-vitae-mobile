import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ConsumoPageModule } from '../pages/consumo/consumo.module';
import { AprazamentoPageModule } from '../pages/aprazamento/aprazamento.module';
import { DetalhesPacientePageModule } from '../pages/detalhes-paciente/detalhes-paciente.module';
import { ApiProvider } from '../providers/api/api';
import { LoginPageModule } from '../pages/login/login.module';
import { ConsumoStorageProvider } from '../providers/consumo-storage/consumo-storage';
import { Device } from '@ionic-native/device';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TabsPageModule,
    ConsumoPageModule,
    AprazamentoPageModule,
    DetalhesPacientePageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device,
    Network,
    ApiProvider,
    ConsumoStorageProvider
  ]
})
export class AppModule {}
