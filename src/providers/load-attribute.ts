import {Injectable} from '@angular/core';
// import {Http} from '@angular/http';
// import 'rxjs/add/operator/map';
import {DataPool} from 'emiya-angular2-datapool';

/*
 Generated class for the LoadAttribute provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LoadAttribute {

  constructor(private dataPool: DataPool) {

  }

  loadAttributeData() {
    let config = {
      id: 'color',
      period: 3600 * 24 * 30,
      request: {
        'method': 'get',
        'url': '/food/rest/default/V1/products/attributes/color',
      },
      receive_mode: 'payload',
      receive_path: 'options'
    }
    let config1 = {
      id: 'size',
      period: 3600 * 24 * 30,
      request: {
        'method': 'get',
        'url': '/food/rest/default/V1/products/attributes/size',
      },
      receive_mode: 'payload',
      receive_path: 'options'
    }
    let config2 = {
      id: 'pattern',
      period: 3600 * 24 * 30,
      request: {
        'method': 'get',
        'url': '/food/rest/default/V1/products/attributes/pattern',
      },
      receive_mode: 'payload',
      receive_path: 'options'
    }
    let config3 = {
      id: 'climate',
      period: 3600 * 24 * 30,
      request: {
        'method': 'get',
        'url': '/food/rest/default/V1/products/attributes/climate',
      },
      receive_mode: 'payload',
      receive_path: 'options'
    }
    let config4 = {
      id: 'material',
      period: 3600 * 24 * 30,
      request: {
        'method': 'get',
        'url': '/food/rest/default/V1/products/attributes/material',
      },
      receive_mode: 'payload',
      receive_path: 'options'
    }
    let config5 = {
      id: 'style_general',
      period: 3600 * 24 * 30,
      request: {
        'method': 'get',
        'url': '/food/rest/default/V1/products/attributes/style_general',
      },
      receive_mode: 'payload',
      receive_path: 'options'
    }
    let config6 = {
      id: 'style_bottom',
      period: 3600 * 24 * 30,
      request: {
        'method': 'get',
        'url': '/food/rest/default/V1/products/attributes/style_bottom',
      },
      receive_mode: 'payload',
      receive_path: 'options'
    }
    let config7 = {
      id: 'goods_cart',
      period: 3600 * 24,
      localData: {}
    }
    this.dataPool.load(config);
    this.dataPool.load(config1);
    this.dataPool.load(config2);
    this.dataPool.load(config3);
    this.dataPool.load(config4);
    this.dataPool.load(config5);
    this.dataPool.load(config6);
    this.dataPool.load(config7);
    this.dataPool.request('size').write('size', {});
    this.dataPool.request('color').write('color', {});
    this.dataPool.request('pattern').write('pattern', {});
    this.dataPool.request('climate').write('climate', {});
    this.dataPool.request('material').write('material', {});
    this.dataPool.request('style_general').write('style_general', {});
    this.dataPool.request('style_bottom').write('style_bottom', {});
    this.dataPool.request('goods_cart').read().then(data => {
      if(data['goodsCart'] == undefined || data['goodsCart']['goods']['goodsMenu'].length == 0) {
        this.dataPool.request('goods_cart').write('goodsCart', {goods:{goodsMenu: [], totalMoney: 0, totalAmount: 0, selectedGoodsAmount: 0}});
      }
    })
    // this.dataPool.request('goods_cart').write('goodsCart', {goods:{goodsMenu: [], totalMoney: 0, totalAmount: 0}});
    // this.dataPool.request('size').read('0').then(data => {
    //   console.log('datapool', data);
    // });
  }
}








