import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Push, PushOptions } from '@ionic-native/push';

import { Observable } from 'rxjs';

import { LoginPage } from '../pages/login/login';
import { AdministracaoStorageProvider } from '../providers/administracao-storage/administracao-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  private isSync: boolean = false;
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private network: Network,
    private push: Push, private administracaoStorage: AdministracaoStorageProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (platform.is('android')) {
        statusBar.styleBlackOpaque();
      } else {
        statusBar.styleDefault();
      }

      splashScreen.hide();

      this.push.hasPermission()
        .then((permission: any) => {
          if (permission.isEnabled) {
            const options: PushOptions = {
              android: {
                sound: true,
                vibrate: true,
                forceShow: true,
                topics: ['aprazamentos']
              },
              ios: {
                alert: true,
                badge: true,
                sound: true,
                topics: ['aprazamentos']
              }
            };

            this.push.init(options);
          }
        });

      this.synchronize();

      Observable.interval(30000).subscribe(() => {
        this.synchronize();
      });
    });
  }

  private isConnected(): boolean {
    let connType: string = this.network.type;

    return connType && connType !== 'unknown' && connType !== 'none';
  }

  private synchronize(): void {
    if (this.isConnected() && !this.isSync) {
      this.isSync = true;

      this.administracaoStorage.synchronize()
        .then(() => this.isSync = false)
        .catch(() => this.isSync = false);
    }
  }

}
