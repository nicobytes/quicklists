import { Component } from '@angular/core';
import { Platform, ionicBootstrap, Storage, LocalStorage } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import { IntroPage } from './pages/intro/intro';
import { DataService } from './providers/data';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  rootPage: any;
  storage: Storage;

  constructor(
    private _platform: Platform
  ) {
    this.storage = new Storage(LocalStorage);
    this._ready();
  }

  private _ready(){
    this._platform.ready().then(() => {
      StatusBar.styleDefault();
      this._getInitPage()
      .then(page  => { 
        this.rootPage = page 
      })
      .catch(error => {
        console.error( error );
        this.rootPage = IntroPage;
      });
    });
  }

  private _getInitPage():Promise<any>{
    let defaultPage:any = IntroPage;
    return this.storage.get('showIntro')
    .then(result =>{
      if(!result){
        this.storage.set('showIntro', true);
      }else{
        defaultPage = HomePage;
      }
      return Promise.resolve(defaultPage);
    })
    .catch(error => Promise.reject(error))
  }


}

ionicBootstrap(MyApp, [DataService]);
