import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/intro/intro.html',
})
export class IntroPage {

  slideOptions: any;

  constructor(
    private _navCtrl: NavController
  ) {
    this.slideOptions = {
      pager: true
    };
  }

  goToHomePage(){
    this._navCtrl.setRoot( HomePage );
  }

}
