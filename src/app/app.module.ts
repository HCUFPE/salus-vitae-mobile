import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { Push } from '@ionic-native/push';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { MyApp } from './app.component';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { AdministracaoPageModule } from '../pages/administracao/administracao.module';
import { AprazamentoPageModule } from '../pages/aprazamento/aprazamento.module';
import { DetalhesAdministracaoPageModule } from '../pages/detalhes-administracao/detalhes-administracao.module';
import { DetalhesPacientePageModule } from '../pages/detalhes-paciente/detalhes-paciente.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SalusVitaeApiProvider } from '../providers/salusvitae-api/salusvitae-api';
import { HCUFPEApiProvider } from '../providers/hcufpe-api/hcufpe-api';
import { AdministracaoStorageProvider } from '../providers/administracao-storage/administracao-storage';
import { UsuarioStorageProvider } from '../providers/usuario-storage/usuario-storage';

export function jwtOptionsFactory(usuarioStorageProvider) {
  return {
    whitelistedDomains: [
      HCUFPEApiProvider.BASE_URL
    ],
    blacklistedRoutes: [
      HCUFPEApiProvider.LOGIN_URL
    ],
    tokenGetter: () => {
      return usuarioStorageProvider.getAccessToken();
    }
  }
}

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
    AdministracaoPageModule,
    AprazamentoPageModule,
    DetalhesAdministracaoPageModule,
    DetalhesPacientePageModule,
    LoginPageModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [UsuarioStorageProvider]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    Network,
    Push,
    SalusVitaeApiProvider,
    HCUFPEApiProvider,
    AdministracaoStorageProvider,
    UsuarioStorageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
