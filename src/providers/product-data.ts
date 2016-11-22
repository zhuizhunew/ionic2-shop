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
      'url': 'goodsCategory',
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
      'url': 'goodsList',
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

  //获取商品详情
  getProductDetail(sku) {
    return this.fetch.request({
      'url': '/food/rest/default/V1/products/' + sku,
      'method': 'get',
    }).then(data => {
      return data;
    }).catch(err => {
      console.log(err);
    })
  }

  //获取二级商品详情
  getSubProductDetail(sku) {
    return this.fetch.request({
      'url': '/food/rest/default/V1/configurable-products/' + sku + '/children',
      'method': 'get',
    }).then(data => {
      return data;
    }).catch(err => {
      console.log(err);
    })
  }

  //获取二级商品更多信息
  getSubProductMore(obj) {
    return this.fetch.request({
      'url': '/food/rest/default/V1/products',
      'method': 'get',
      params: searchProductsBySkus([{sku: obj}])
    }).then(data => {
      return data;
    }).catch(err => {
      console.log(err);
    })
  }

  dataTransfer(obj) {
    return {
      sku: obj.sku,
      name: obj.name,
      price: obj.price,
      img: 'http://192.168.102.28:8000/pub/media/catalog/product' + obj.custom_attributes[3].value,
      count: 0,
      type: obj.type_id,
      selected: true,
      category: 1
    }
  }

  fillCartCount(obj) {
    if (obj.length) {
      // console.log('return obj', obj);
      this.dataPool.request('goods_cart').read('goodsCart').then(data => {
        this.dataPoolGoods = data['goods'];
        // console.log('this.dataPoolGoods', this.dataPoolGoods);
        obj.map(item => {
          let sku = [];
          // if (data['goods']['goodsMenu'].length == 0) {
          //   item.count = 0;
          // } else {
          data['goods']['goodsMenu'].map(one => {
            sku.push(one['sku']);
          })
          if (sku.indexOf(item['sku']) > -1) {
            let i = sku.indexOf(item['sku']);
            item['count'] = data['goods']['goodsMenu'][i]['count'];
          }else {
            item['count'] = 0;
          }
          // }
        })
      })
      return obj;
    }
    else {
      // console.log('return obj123', obj);
      this.dataPool.request('goods_cart').read('goodsCart').then(data => {
        this.dataPoolGoods = data['goods'];
        let sku = [];
        // if (data['goods']['goodsMenu'].length == 0) {
        //   item.count = 0;
        // } else {
        data['goods']['goodsMenu'].map(one => {
          sku.push(one['sku']);
        })
        if (sku.indexOf(obj['sku']) > -1) {
          let i = sku.indexOf(obj['sku']);
          obj['count'] = data['goods']['goodsMenu'][i]['count'];
        }else {
          obj['count'] = 0;
        }
        // console.log('this.dataPoolGoods 不是数组', this.dataPoolGoods);
        // data['goods']['goodsMenu'].map(one => {
        //   // console.log('one 234 4443', one);
        //   if (obj.sku == one.sku) {
        //     obj.count = one.count;
        //   }
        // })
      })
      // console.log('不是数组', obj);
      return obj;
    }
  }

  //color,size//////
  fillCartCount_size(obj) {
    this.dataPool.request('goods_cart').read('goodsCart').then(data => {
      this.dataPoolGoods = data['goods'];
      data['goods']['goodsMenu'].map(one => {
        if (obj.goodsSku == one.sku.split('-')[0]) {
          obj.count = one.count;
        }
      })
    })
    return obj;
  }
}
