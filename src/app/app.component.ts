import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Push, PushOptions, PushObject } from '@ionic-native/push';

import { Observable } from 'rxjs';

import { LoginPage } from '../pages/login/login';
import { AdministracaoStorageProvider } from '../providers/administracao-storage/administracao-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
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
                forceShow: true,
                topics: ['aprazamentos']
              },
              ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
              }
            };

            const pushObject: PushObject = this.push.init(options);
            pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
          }
        });

      let isSync: boolean = false;

      Observable.interval(30000).subscribe(() => {
        if (this.isConnected() && !isSync) {
          isSync = true;

          this.administracaoStorage.synchronize()
            .then(() => isSync = false)
            .catch(() => isSync = false);
        }
      });
    });
  }

  isConnected(): boolean {
    let connType: string = this.network.type;

    return connType && connType !== 'unknown' && connType !== 'none';
  }

}
