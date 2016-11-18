import {Injectable} from '@angular/core';
import {Fetch} from "emiya-angular2-fetch";
import {searchProductsBySkus} from '../tools/magento-search';
import {DataPool} from 'emiya-angular2-datapool';

/*
 Generated class for the ProductData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ProductData {

  public dataPoolGoods: any;

  constructor(private fetch: Fetch, private dataPool: DataPool) {

  }

  //获取产品左侧种类
  getCategory() {
    return this.fetch.request({
      'url': '/food/rest/default/V1/categories',
      'method': 'get',
    }).then((data: {data}) => {
      return data.data.children_data;
    }).catch(err => {
      console.log(err);
    })
  }

  //获取特定产品种类下所有sku
  getCategorySku(id) {
    return this.fetch.request({
      'url': '/food/rest/default/V1/categories/' + id + '/products',
      'method': 'get',
    }).then((data: {data}) => {
      return data.data
    })
  }

  //通过sku查询产品列表详细信息
  getProductList(obj) {
    return this.fetch.request({
      'url': '/food/rest/default/V1/products',
      'method': 'get',
      params: searchProductsBySkus(obj)
    }).then((data: {data: {items}}) => {
      let goods = data.data.items.map(item => {
        return this.dataTransfer(item);
      })
      return goods;
    })
  }

  //获取产品右侧列表
  getProductInfo(id) {
    return this.getCategorySku(id).then(data => {
      return this.getProductList(data)
    })
  }

  dataTransfer(obj) {
    return {
      sku: obj.sku,
      name: obj.name,
      price: obj.price,
      img: 'http://192.168.102.28:8000/pub/media/catalog/product' + obj.custom_attributes[1].value,
      count: 0,
      type: obj.type_id,
      selected: true
    }
  }

  fillCartCount(obj) {
    this.dataPool.request('goods_cart').read('goodsCart').then(data => {
      this.dataPoolGoods = data['goods'];
      console.log('this.dataPoolGoods',this.dataPoolGoods);
      obj.map(item => {
        data['goods']['goodsMenu'].map(one => {
          if(item.sku == one.sku) {
            item.count = one.count;
          }
        })
      })
    })
    return obj;
  }
}
