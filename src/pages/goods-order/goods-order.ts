import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DataPool,DataPoolHandle} from 'emiya-angular2-datapool';
import {Header} from '../../directives/header/header';
import {Router} from 'emiya-ionic2-router';



/*
  Generated class for the GoodsOrder page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-goods-order',
  templateUrl: 'goods-order.html'
})
export class GoodsOrderPage {

  public goodsOrder = {goodsMenu: [],totalMoney: 0, totalAmount: 0};
  public canGoBack:any;

  constructor(public navCtrl: NavController, private dataPool: DataPool, private router: Router) {
    this.dataPool.request('goods_cart').onChange(() => {
      this.dataPool.request('goods_cart').read('goodsCart').then(data => {
        this.goodsOrder = data['goods'];
        // console.log('this.goodsOrder',this.goodsOrder);
      })
    })
    this.canGoBack = this.router.canGoBack;
    // console.log('this.router.canGoBack',this.router.canGoBack)
  }

  ionViewDidEnter() {

  }

  check(obj) {
    // console.log(obj);
    if(obj.selected) {
      obj.checkImg = 'assets/icon/ic_check_white_24px.svg';
      obj.selected = !obj.selected;
      this.goodsOrder.totalMoney -= obj.count * obj.price;
    }else {
      obj.checkImg = 'assets/icon/ic_check_black_24px.svg';
      obj.selected = !obj.selected;
      this.goodsOrder.totalMoney += obj.count * obj.price;
    }
  }
}
