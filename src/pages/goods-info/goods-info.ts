import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Fetch } from 'emiya-angular2-fetch';

/*
  Generated class for the GoodsInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-goods-info',
  templateUrl: 'goods-info.html'
})
export class GoodsInfoPage {

  constructor(public navCtrl: NavController, public params: NavParams, public fetch: Fetch) {}

  ionViewDidLoad() {
    this.fetch.request({
      'url':'/food/rest/default/V1/products/' + this.params.data.data,
      'method': 'get',
    }).then(data => {
      console.log(data);
    })
    console.log(this.params.data.data);
  }

}
