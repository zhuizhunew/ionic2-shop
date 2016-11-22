import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
import {Fetch} from 'emiya-angular2-fetch';
import {PlusReduce} from '../../directives/plus-reduce/plus-reduce';
import {Event} from 'emiya-angular2-event';
import {ProductData} from '../../providers/product-data';
import {Header} from '../../directives/header/header';
import {DataPool, DataPoolHandle} from 'emiya-angular2-datapool';


/*
 Generated class for the GoodsInfo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-goods-info',
  templateUrl: 'goods-info.html',
  providers: [ProductData]
})
export class GoodsInfoPage {

  public goodsInfo: any = {
    img: '',
    name: '',
    price: '',
    count: 0,
    sku: '',
    detail: '',
    selected: true,
    category: 2
  };
  public info_selected = 0;

  constructor(public navCtrl: NavController, public params: NavParams, public fetch: Fetch, private productData: ProductData,private dataPool: DataPool) {
    console.log('this.goodsInfo.count++;15454', this.goodsInfo.count);
    Event.subscribe('goodListCountPlus', () => {
      console.log('this.goodsInfo.count++;', this.goodsInfo.count);
      this.goodsInfo.count++;
    })
    Event.subscribe('goodsListCountReduce', () => {
      this.goodsInfo.count--;
    })
    Event.subscribe('clearShopcart', () => {
      this.goodsInfo.count = 0;
    })

    dataPool.request('goods_cart').onChange(() => {
      this.goodsInfo = this.productData.fillCartCount(this.goodsInfo);
    })
  }

  @ViewChild('infoSlider') infoSlider: Slides;

  ionViewDidLoad() {
    this.productData.getProductDetail(this.params.data.data).then(data => {
      this.goodsInfo.name = data['data']['name'];
      this.goodsInfo.price = data['data']['price'];
      this.goodsInfo.img = 'http://192.168.102.28:8000/pub/media/catalog/product' + data['data']['custom_attributes'][3].value;
      this.goodsInfo.detail = data['data']['custom_attributes'][0].value;
      this.goodsInfo.sku = data['data']['sku'];
      this.goodsInfo = this.productData.fillCartCount(this.goodsInfo);
    })
    // this.fetch.request({
    //   'url': '/food/rest/default/V1/products/' + this.params.data.data,
    //   'method': 'get',
    // }).then(data => {
    //   this.goodsInfo.name = data['data']['name'];
    //   this.goodsInfo.price = data['data']['price'];
    //   this.goodsInfo.img = 'http://192.168.102.28:8000/pub/media/catalog/product' + data['data']['custom_attributes'][1].value;
    //   this.goodsInfo.detail = data['data']['custom_attributes'][0].value;
    //   this.goodsInfo.sku = data['data']['sku'];
    //   this.goodsInfo = this.productData.fillCartCount(this.goodsInfo);
    // })
  }

  slideToInfo(i) {
    this.infoSlider.slideTo(i, 100);
    this.info_selected = i;
  }

  onSlideChanged() {
    this.info_selected = this.infoSlider.getActiveIndex();
  }

}
