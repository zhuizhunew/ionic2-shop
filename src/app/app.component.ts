import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from '../pages/tabs/tabs';
import {Router} from 'emiya-ionic2-router';
import {Routes} from '../configs/routes';
import {DataPool} from 'emiya-angular2-datapool';
import {LoadAttribute} from '../providers/load-attribute';


@Component({
  template: `<ion-nav></ion-nav>`,
  providers: [Router, LoadAttribute],
})
export class MyApp {
  // rootPage = TabsPage;

  constructor(platform: Platform, private router: Router, private dataPool: DataPool, private loadAttribute: LoadAttribute) {
    router.setVersion('Hello World', 10000);
    router.load(Routes);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.loadAttribute.loadAttributeData();
    // let config = {
    //   id: 'color',
    //   period: 3600 * 24 * 30,
    //   request: {
    //     'method': 'get',
    //     'url': '/food/rest/default/V1/products/attributes/color',
    //   },
    //   receive_mode: 'payload',
    //   receive_path: 'options'
    // }
    // let config1 = {
    //   id: 'size',
    //   period: 3600 * 24 * 30,
    //   request: {
    //     'method': 'get',
    //     'url': '/food/rest/default/V1/products/attributes/size',
    //   },
    //   receive_mode: 'payload',
    //   receive_path: 'options'
    // }
    // let config2 = {
    //   id: 'pattern',
    //   period: 3600 * 24 * 30,
    //   request: {
    //     'method': 'get',
    //     'url': '/food/rest/default/V1/products/attributes/pattern',
    //   },
    //   receive_mode: 'payload',
    //   receive_path: 'options'
    // }
    // let config3 = {
    //   id: 'climate',
    //   period: 3600 * 24 * 30,
    //   request: {
    //     'method': 'get',
    //     'url': '/food/rest/default/V1/products/attributes/climate',
    //   },
    //   receive_mode: 'payload',
    //   receive_path: 'options'
    // }
    // let config4 = {
    //   id: 'material',
    //   period: 3600 * 24 * 30,
    //   request: {
    //     'method': 'get',
    //     'url': '/food/rest/default/V1/products/attributes/material',
    //   },
    //   receive_mode: 'payload',
    //   receive_path: 'options'
    // }
    // let config5 = {
    //   id: 'style_general',
    //   period: 3600 * 24 * 30,
    //   request: {
    //     'method': 'get',
    //     'url': '/food/rest/default/V1/products/attributes/style_general',
    //   },
    //   receive_mode: 'payload',
    //   receive_path: 'options'
    // }
    // let config6 = {
    //   id: 'style_bottom',
    //   period: 3600 * 24 * 30,
    //   request: {
    //     'method': 'get',
    //     'url': '/food/rest/default/V1/products/attributes/style_bottom',
    //   },
    //   receive_mode: 'payload',
    //   receive_path: 'options'
    // }
    // let config7 = {
    //   id: 'goods_cart',
    //   period: 3600 * 24,
    //   localData: {}
    // }
    //   dataPool.load(config);
    // dataPool.load(config1);
    // dataPool.load(config2);
    // dataPool.load(config3);
    // dataPool.load(config4);
    // dataPool.load(config5);
    // dataPool.load(config6);
    // dataPool.load(config7);
    //  dataPool.request('size').write('abc0', {});
    // dataPool.request('color').write('abc0', {});
    // dataPool.request('pattern').write('abc0', {});
    // dataPool.request('climate').write('abc0', {});
    // dataPool.request('material').write('abc0', {});
    // dataPool.request('style_general').write('abc0', {});
    // dataPool.request('style_bottom').write('abc0', {});
    // dataPool.request('goods_cart').write('abc0', {id: 123});
    //  // dataPool.request('size').read('0').then(data => {
    // //   console.log('datapool', data);
    // // });
  }
}

















