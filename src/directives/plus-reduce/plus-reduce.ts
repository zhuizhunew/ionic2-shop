/**
 * Created by zhuzhui on 2016/11/18.
 */
import {Component, Input} from '@angular/core';
import {DataPool, DataPoolHandle} from 'emiya-angular2-datapool';
import {Event} from 'emiya-angular2-event';

@Component({
  selector: 'plusReduce',
  templateUrl: 'plus-reduce.html'
})

export class PlusReduce {

  @Input() product = {price: 0, count: 0};
  public shopCart = {goodsMenu: [], totalMoney: 0, totalAmount: 0, selectedGoodsAmount: 0};

  constructor(private dataPool: DataPool) {
    dataPool.request('goods_cart').onChange(() => {
      dataPool.request('goods_cart').read('goodsCart').then(data => {
        this.shopCart = data['goods'];
      })
    })
  }

  plus(obj) {
    // console.log('plus',obj);
    event.stopPropagation();
    let sku = [];
    this.shopCart.goodsMenu.map((item) => {
      sku.push(item['sku']);
    })
    if (sku.indexOf(obj['sku']) > -1) {
      let i = sku.indexOf(obj['sku']);
      this.shopCart.goodsMenu[i].count++;
    } else {
      obj.count++;
      this.shopCart.goodsMenu.push(obj);
    }
    this.shopCart.totalMoney += obj.price;
    this.shopCart.totalAmount++;
    this.shopCart.selectedGoodsAmount++;
    this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
    if (obj['category'] == 1) {
      Event.emit('refreshCount', {});
    } else {
      Event.emit('goodListCountPlus', {});
    }
    // obj.count ++;
  }

  reduce(obj) {
    event.stopPropagation();
    let sku = [];
    this.shopCart.goodsMenu.map((item) => {
      sku.push(item['sku']);
    })
    let i = sku.indexOf(obj['sku']);
    if (obj.count > 1) {
      this.shopCart.goodsMenu[i].count--;
    } else {
      obj.count--;
      this.shopCart.goodsMenu.splice(i, 1);
    }
    this.shopCart.totalMoney -= obj.price;
    this.shopCart.totalAmount--;
    this.shopCart.selectedGoodsAmount--;
    this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
    if (obj['category'] == 1) {
      Event.emit('refreshCount', {});
    } else {
      Event.emit('goodsListCountReduce', {});
    }
    if (this.shopCart.goodsMenu.length == 0) {
      Event.emit('noGoods', {});
    }
  }
}
