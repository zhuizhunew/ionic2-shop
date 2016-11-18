import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
import {Fetch} from 'emiya-angular2-fetch';
import {searchProductsBySkus} from '../../tools/magento-search';
import {DataPool} from 'emiya-angular2-datapool';
import {ShopCartPage} from '../../directives/shopcart/shopcart-footer';

@Component({
  selector: 'page-goods-list',
  templateUrl: 'goods-list.html'
})
export class GoodsListPage {

  public goodsImg: any = [];
  public goodsName: any;
  public goodsPrice: any;
  public goodsCount: number = 0;
  public goodsColor: any = [];
  public goodsSize: any = [];
  public goodsInfo: any = {
    goodsImg: [],
    goodsName: '',
    goodsPrice: '',
    goodsCount: 0,
    goodsColor: [],
    goodsSize: [],
    goodsSku: ''
  };
  public goodsDetail: any;
  public goodsStyle = [];
  public goodsStyleBottom = [];
  public goodsPattern = [];
  public goodsMaterial = [];
  public goodsClimate = [];
  public color_selected_index: any;
  public size_selected_index: any;
  public colorStandard: any;
  public sizeStandard: any;
  public styleGeneralStandard: any;
  public styleBottomStandard: any;
  public materialStandard: any;
  public patternStandard: any;
  public climateStandard: any;
  public shopCart = {goodsMenu: [], totalMoney: 0, totalAmount: 0};
  public info_selected: number = 0;
  public goods_sku: any = [];

  constructor(public navCtrl: NavController, private params: NavParams, private fetch: Fetch, private dataPool: DataPool) {
    dataPool.request('color').read().then(data => {
      this.colorStandard = data;
    });
    dataPool.request('size').read().then(data => {
      this.sizeStandard = data;
    });
    dataPool.request('pattern').read().then(data => {
      this.patternStandard = data;
    });
    dataPool.request('material').read().then(data => {
      this.materialStandard = data;
    });
    dataPool.request('climate').read().then(data => {
      this.climateStandard = data;
    });
    dataPool.request('style_general').read().then(data => {
      this.styleGeneralStandard = data;
    });
    dataPool.request('style_bottom').read().then(data => {
      this.styleBottomStandard = data;
      console.log('this.styleBottomStandard', this.styleBottomStandard);
    });
    this.dataPool.request('goods_cart').read().then(data => {
      console.log('222222', data)
      // this.shopCart = data['abc']['goods'];
    }).catch(err => {
      alert(err);
    });
    this.getProductMoreInfo();
  }

  @ViewChild('imgSlide') slider: Slides;
  @ViewChild('infoSlider') infoSlider: Slides;

  ionViewDidLoad() {
    this.fetch.request({
      'url': '/food/rest/default/V1/configurable-products/' + this.params.data.data + '/children',
      'method': 'get',
    }).then(data => {
      console.log('d2d2d2d2d2d', data['data']);
      data['data'].map(item => {
        return this.goods_sku.push(item['sku'])
      })
      console.log('this.goods_sku', this.goods_sku)
      let color = [];
      let size = [];
      data['data'].map(item => {
        item['custom_attributes'].map(obj => {
          if (obj.attribute_code == "color") {
            color.push(obj.value);
          }
          if (obj.attribute_code == 'size') {
            size.push(obj.value)
          }
        })
      })
      let name = data['data'][0].name;
      this.goodsInfo.goodsName = name.split(' ').slice(0, name.split(' ').length - 1).join(' ');
      this.goodsInfo.goodsPrice = data['data'][0].price;
      this.goodsInfo.goodsColor = this.getAttributeData(this.colorStandard, color);
      this.goodsInfo.goodsSize = this.getAttributeData(this.sizeStandard, size);
      this.goodsInfo.goodsImg = this.unique(
        data['data'].map(item => {
          return 'http://192.168.102.28:8000/pub/media/catalog/product' + item['custom_attributes'][6].value
        })
      )
    })
  }

  slideTo(i) {
    this.slider.slideTo(i, 0);
    console.log(i);
    this.color_selected_index = i;
  }

  chooseSize(i) {
    this.size_selected_index = i;
  }

  //数组去重
  unique(arr) {
    return Array.from(new Set(arr))
  }

  //取属性值
  getAttributeData(rule, num) {
    let data = [];
    this.unique(num).map(size => {
      rule.map(item => {
        if (item.value == size) {
          data.push(item.label);
        }
      })
    })
    return data;
  }


  getProductMoreInfo() {
    this.fetch.request({
      'url': '/food/rest/default/V1/products',
      'method': 'get',
      params: searchProductsBySkus([{sku: this.params.data.data}])
    }).then(data => {
      console.log('detail1111111', data['data']);
      console.log('detail1111111', data['data']['items'][0]['sku']);
      console.log('detail', data['data']['items'][0]['custom_attributes']);
      console.log('detail', data['data']['items'][0]['custom_attributes'][15].value.split(','));
      this.goodsInfo.goodsSku = data['data']['items'][0]['sku'];
      this.goodsDetail = data['data']['items'][0]['custom_attributes'][0].value;
      let pattern = [];
      let climate = [];
      let material = [];
      let style_general = [];
      let style_bottom = [];
      data['data']['items'][0]['custom_attributes'].map(item => {
        if (item.attribute_code == "climate") {
          item.value.split(',').map(item => {
            climate.push(item);
          })
        }
        if (item.attribute_code == "pattern") {
          item.value.split(',').map(item => {
            pattern.push(item);
          })
        }
        if (item.attribute_code == "material") {
          item.value.split(',').map(item => {
            material.push(item);
          })
        }
        if (item.attribute_code == "style_general") {
          item.value.split(',').map(item => {
            style_general.push(item);
          })
        }
        if (item.attribute_code == "style_bottom") {
          item.value.split(',').map(item => {
            style_bottom.push(item);
          })
        }
      })
      this.goodsClimate = this.getAttributeData(this.climateStandard, climate);
      this.goodsPattern = this.getAttributeData(this.patternStandard, pattern);
      this.goodsMaterial = this.getAttributeData(this.materialStandard, material);
      this.goodsStyle = this.getAttributeData(this.styleGeneralStandard, style_general);
      this.goodsStyleBottom = this.getAttributeData(this.styleBottomStandard, style_bottom);
    })
  }

  plus() {
    console.log('this.color_selected_index', this.goodsInfo.goodsColor[this.color_selected_index]);
    console.log('this.size_selected_index', this.goodsInfo.goodsSize[this.size_selected_index]);
    let goodsSku = this.goodsInfo.goodsSku + '-' + this.goodsInfo.goodsSize[this.size_selected_index]
      + '-' + this.goodsInfo.goodsColor[this.color_selected_index];
    console.log('this.goodsInfo.goodsSku', goodsSku);
    this.goodsInfo.goodsCount++;
    this.shopCart.totalAmount++;
    this.shopCart.totalMoney += this.goodsInfo.goodsPrice;
    let goodsDetail = {
      name: this.goodsInfo.goodsName,
      price: this.goodsInfo.goodsPrice,
      color: this.goodsInfo.goodsColor[this.color_selected_index],
      size: this.goodsInfo.goodsSize[this.size_selected_index],
      img: this.goodsInfo.goodsImg[this.color_selected_index],
      sku: goodsSku,
      count: 1
    }
    let sku = this.shopCart.goodsMenu.map(item => {
      return item.sku
    })
    if (sku.indexOf(goodsSku) > -1) {
      let i = sku.indexOf(goodsSku);
      this.shopCart.goodsMenu[i].count++;
    } else {
      this.shopCart.goodsMenu.push(goodsDetail);
    }
    console.log('sku', sku);
    // console.log('this.shopCart.goodsMenu.indexOf(goodsInfo)', this.shopCart.goodsMenu.indexOf(obj));
    // if (this.shopCart.goodsMenu.indexOf(obj) > -1) {
    //   let i = this.shopCart.goodsMenu.indexOf(obj);
    //   this.shopCart.goodsMenu[i].count++;
    // } else {
    //   this.shopCart.goodsMenu.push(obj);
    // }
    console.log('plus shopcart', this.shopCart);
  }


  slideToInfo(i) {
    this.infoSlider.slideTo(i, 100);
    this.info_selected = i;
  }
}

