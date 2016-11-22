import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {TabsPage} from '../pages/tabs/tabs';
import {Router} from 'emiya-ionic2-router';
import {Routes} from '../configs/routes';
import {DataPool,DataPoolHandle} from 'emiya-angular2-datapool';
import {LoadAttribute} from '../providers/load-attribute';
import {Api} from '../configs/api';
import { Fetch } from "emiya-angular2-fetch";



@Component({
  template: `<ion-nav></ion-nav>`,
  providers: [Router, LoadAttribute],
})
export class MyApp {
  // rootPage = TabsPage;

  constructor(platform: Platform, private router: Router, private dataPool: DataPool, private loadAttribute: LoadAttribute, private fetch: Fetch) {
    router.setVersion('Hello World', 10000);
    router.load(Routes);
    fetch.load('dev',Api);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.loadAttribute.loadAttributeData();
  }
}

















