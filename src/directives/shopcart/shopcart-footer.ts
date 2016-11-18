/**
 * Created by zhuzhui on 2016/11/17.
 */
import {Component,Input} from '@angular/core';
import {DataPool} from 'emiya-angular2-datapool';

@Component({
  selector: 'shopCart',
  templateUrl: 'shopcart-footer.html',
})


export class ShopCartPage{
  public shopCart = {goodsMenu: [], totalMoney: 0, totalAmount: 0};
  // @Input() shopCart = {totalAmount: Number, totalMoney: Number};
  @Input() show: Function;
  constructor(private dataPool: DataPool) {
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
}
