import { Component } from '@angular/core';

import { NavController,Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Data } from '../../providers/data';
import {Http} from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Data]
})
export class HomePage {

  constructor(public navCtrl: NavController,private platform: Platform, private data: Data, private http: Http) {
    // if (this.platform.is('ipad')) {
    //   console.log("I'm an iOS device!");
    // }else {
    //   console.log('not an IOS device');
    // }
  }

  goLogin() {
    this.navCtrl.push(LoginPage);
    this.data.send();
  }

  // getData2() {
  //   this.http.get('local://getHomeData.json').subscribe((res) => console.log(res));
  //   // http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
  // }
}
