import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Router} from 'emiya-ionic2-router';
import {AboutPage} from '../about/about';



/*
  Generated class for the Goods page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-goods',
  templateUrl: 'goods.html'
})
export class GoodsPage {

  constructor(public navCtrl: NavController,private router: Router) {}

  ionViewDidLoad() {
  }

  goGoods() {
    this.router.push(AboutPage);
  }

}
