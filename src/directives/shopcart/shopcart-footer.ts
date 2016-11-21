/**
 * Created by zhuzhui on 2016/11/17.
 */
import {Component,Input} from '@angular/core';
import {DataPool,DataPoolHandle} from 'emiya-angular2-datapool';
import {PopoverPage} from '../../pages/goods-menu/goods-menu';
import {PopoverController} from 'ionic-angular';
import {Router} from 'emiya-ionic2-router';
import {GoodsOrderPage} from '../../pages/goods-order/goods-order';


@Component({
  selector: 'shopCart',
  templateUrl: 'shopcart-footer.html',
})


export class ShopCartPage{
  public shopCart = {goodsMenu: [], totalMoney: 0, totalAmount: 0};
  // @Input() shopCart = {totalAmount: Number, totalMoney: Number};
  // @Input() show: Function;
  constructor(private dataPool: DataPool, private popoverCtrl: PopoverController, private router: Router) {
    dataPool.request('goods_cart').read('goodsCart').then(data => {
      console.log('ShopCartPage',data);
    })
    dataPool.request('goods_cart').onChange(() => {
      console.log('dataPool onchange ShopCartPage');
      dataPool.request('goods_cart').read('goodsCart').then(data => {
        console.log('data pool change',data['goods']);
        this.shopCart = data['goods'];
        this.shopCart.goodsMenu.map(item => {
          return item.checkImg = '../../assets/icon/ic_check_black_24px.svg';
        })
      })
    })
  }

  show() {
    let popover = this.popoverCtrl.create(PopoverPage, {data: this.shopCart}, {
      cssClass: 'goodsMenu',
      enableBackdropDismiss: false
    });
    popover.present({
      // ev: myEvent
    }).then(() => {
      document.getElementsByTagName('ion-backdrop')[0]['onclick'] = () => {
        popover.dismiss(undefined, undefined, {duration: 1000, animate: false})
      }
    });
  }

  goGoodsOrder() {
    this.router.push(GoodsOrderPage);
  }
}
