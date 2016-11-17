/**
 * Created by zhuzhui on 2016/11/7.
 */
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {LogoutPage} from '../logout/logout';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  public keyword = '热销123';

  constructor(public navCtrl: NavController) {

  }


  ionViewDidEnter() {
    // document.getElementById('title').addEventListener('touchstart',function (e) {
    //   // console.log('touchstart',e);
    //   console.log("document.getElementById('title')",document.getElementById('title').getElementsByClassName('scroll-zoom-wrapper')[0].getBoundingClientRect());
    // })
    document.getElementById('title').addEventListener('touchmove',(e) => {
      let distance = document.getElementById('title').getElementsByClassName('scroll-zoom-wrapper')[0].getBoundingClientRect().top;
      if(distance < 200) {
        console.log(22222);
        // setTimeout(() => {
          this.keyword = '优惠';
      // },10000)
        // console.log(this.keyword);
      }
      // console.log("document.getElementById('title')",document.getElementById('title').getElementsByClassName('scroll-zoom-wrapper')[0]);
      // console.log("document.getElementById('title')",document.getElementById('title').getElementsByClassName('scroll-zoom-wrapper')[0].getBoundingClientRect().top);
    })
    // document.getElementById('title').addEventListener('touchend',function (e) {
    //   // console.log('touchend',e);
    //   console.log("document.getElementById('title')",document.getElementById('title').getElementsByClassName('scroll-zoom-wrapper')[0].getBoundingClientRect());
    // })
  }

  goLogout() {
    this.navCtrl.push(LogoutPage);
  }

  send(event) {
    this.keyword = '优惠';
    console.log(event);
    console.log(event.pageX);
    console.log(event.pageY);
  }
}
