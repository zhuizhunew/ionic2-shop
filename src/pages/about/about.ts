import {Component} from '@angular/core';

import {NavController, PopoverController, ViewController, NavParams} from 'ionic-angular';
import {Fetch} from "emiya-angular2-fetch";
import {Router} from 'emiya-ionic2-router';
import {searchProductsBySkus} from '../../tools/magento-search';
import {PopoverPage} from '../goods-menu/goods-menu';
import {GoodsInfoPage} from '../goods-info/goods-info';
import {GoodsListPage} from '../goods-list/goods-list';
import {ShopCartPage} from '../../directives/shopcart/shopcart-footer';
import {DataPool,DataPoolHandle} from 'emiya-angular2-datapool';
import {ProductData} from '../../providers/product-data';
import {Event} from 'emiya-angular2-event';
import {PlusReduce} from '../../directives/plus-reduce/plus-reduce';
import {Header} from '../../directives/header/header';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [ProductData]
})

export class AboutPage {

  public heigt: any;
  public width: any;
  public value: number = 0;
  public goods = [
    // {img: 'assets/icon/favicon.ico', name: '赣南脐橙', price: 22.00, count: 0, sku: 'qc1', selected: true},
    // {img: 'assets/icon/favicon.ico', name: '赣南脐橙2', price: 21.00, count: 0, sku: 'qc2', selected: true},
    // {img: 'assets/icon/favicon.ico', name: '赣南脐橙3', price: 20.00, count: 0, sku: 'qc3', selected: true},
    // {img: 'assets/icon/favicon.ico', name: '赣南脐橙4', price: 19.00, count: 0, sku: 'qc4', selected: true},
    // {img: 'assets/icon/favicon.ico', name: '赣南脐橙5', price: 18.00, count: 0, sku: 'qc5', selected: true},
    // {img: 'assets/icon/favicon.ico', name: '赣南脐橙6', price: 17.00, count: 0, sku: 'qc6', selected: true},
    // {img: 'assets/icon/favicon.ico', name: '赣南脐橙7', price: 18.80, count: 0, sku: 'qc7', selected: true},
  ];
  // public goods1 = [
  //   {img: 'assets/icon/favicon.ico', name: '脐橙', price: 22.00, count: 0},
  //   {img: 'assets/icon/favicon.ico', name: '脐橙2', price: 21.00, count: 0},
  //   {img: 'assets/icon/favicon.ico', name: '脐橙3', price: 20.00, count: 0},
  //   {img: 'assets/icon/favicon.ico', name: '脐橙4', price: 19.00, count: 0},
  //   {img: 'assets/icon/favicon.ico', name: '脐橙5', price: 18.00, count: 0},
  //   {img: 'assets/icon/favicon.ico', name: '脐橙6', price: 17.00, count: 0},
  //   {img: 'assets/icon/favicon.ico', name: '脐橙7', price: 18.80, count: 0},
  // ];
  public catagory = [{
    selected: true,
    value: '热销榜',
    sub_item: {name: [{value: '秒杀', selected: 'true'}, {value: '直降', selected: false}], showOrNot: true}
  },
    {selected: false, value: '优惠'},
    {selected: false, value: '折扣单品'},
    {selected: false, value: '特色小吃'},
    {selected: false, value: '粥品/饺子'},
    {
      selected: false,
      value: '特色粉面',
      sub_item: {name: [{value: '肠粉', selected: 'false',}, {value: '炒粉', selected: false}], showOrNot: true}
    },
    {selected: false, value: '单人精彩餐'}, {selected: false, value: '豆制品'}, {selected: false, value: '黄金搭配'},
    {selected: false, value: '配菜'}, {selected: false, value: '猪肉类快餐'}, {selected: false, value: '鱼/禽/蔬/豆类快餐'},
    {selected: false, value: '老火炖汤'}, {selected: false, value: '饮品'}, {selected: false, value: '大牌对折'},
    {selected: false, value: '大牌对折'}, {selected: false, value: '大牌对折'}, {selected: false, value: '大牌对折'},];
  public catagory_item: any = "Tops";
  public catagory_new: any;
  public selected_index: any;
  public sub_selected_index: any;
  public son_selected_index: any;
  public shopCart = {goodsMenu: [], totalMoney: 0, totalAmount: 0};
  public showGoodsCart: any;

  constructor(public navCtrl: NavController, private fetch: Fetch, private popoverCtrl: PopoverController,
              private router: Router, private dataPool: DataPool, private productData: ProductData) {
    this.heigt = screen.height - 50;
    this.width = screen.width - 90;
    this.productData.getCategory().then(data => {
      this.catagory_new = data;
    })
    // this.fetch.translateObj2UrlParam()
    this.showGoodsCart = this.showGoods.bind(this);
    this.dataPool.request('goods_cart').read('goodsCart').then(data => {
      this.shopCart = data['goods'];
    })
    Event.subscribe('refreshCount',() => {
      this.goods = this.productData.fillCartCount(this.goods);
    })
    Event.subscribe('clearShopcart',() => {
      this.goods.map(item => {
        item.count = 0;
      });
    })

    Event.subscribe('goodListCountPlus', () => {
      this.goods = this.productData.fillCartCount(this.goods);
    })
    Event.subscribe('goodsListCountReduce', () => {
      this.goods = this.productData.fillCartCount(this.goods);
    })

    this.productData.getProductInfo(21).then(data => {
      this.goods = this.productData.fillCartCount(data);
    })
  }


  ionViewDidLeave() {
    // this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
  }

  // select_item(obj1, obj2) {
  //   obj1.sub_item.name.map(item => {
  //     item.selected = false;
  //   });
  //   obj2.selected = true;
  //   this.catagory_item = obj2.value;
  // }

  select_new(obj) {
    this.selected_index = obj.id;
    let category_id = obj.id + 1;
    if (obj.children_data.length > 0) {
      this.sub_selected_index = obj.children_data[0].id;
    }
    // this.getProductInfo(category_id);
    this.productData.getProductInfo(category_id).then(data => {
      this.goods = this.productData.fillCartCount(data);
    })
    if (obj.children_data.length > 0) {
      this.catagory_item = obj.children_data[0].name;
    } else {
      this.catagory_item = obj.name;
    }
  }

  choose(sub) {
    this.sub_selected_index = sub.id;
    this.productData.getProductInfo(sub.id).then(data => {
      this.goods = this.productData.fillCartCount(data);
    })
    this.catagory_item = sub.name;
  }

  // getProductList(obj) {
  //   this.fetch.request({
  //     'url': '/food/rest/default/V1/products',
  //     'method': 'get',
  //     // 'params': {
  //     //   searchCriteria:{
  //     //     filter_groups:[
  //     //       {
  //     //         filters:[
  //     //           {"field":"sku","value":"24-MG04","condition_type":"eq"},
  //     //           {"field":"sku","value":"WH01","condition_type":"eq"}
  //     //         ]
  //     //       }
  //     //     ]
  //     //   }
  //     // }
  //     params: searchProductsBySkus(obj)
  //   }).then((data: {data: {items}}) => {
  //     console.log('字段', data);
  //     this.goods = data.data.items.map(item => {
  //       return this.dataTransfer(item);
  //     })
  //     // this.goods = data.data.items;
  //     // console.log(`2121233333`,this.goods);
  //   })
  // }

  showGoods() {
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

  goDetail(obj) {
    if (obj.type == 'simple' || obj.type == 'downloadable') {
      this.router.push(GoodsInfoPage, {data: obj.sku});
    } else {
      this.router.push(GoodsListPage, {data: obj.sku});
    }
  }

}
