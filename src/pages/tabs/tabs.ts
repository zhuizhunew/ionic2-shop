import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { GoodsOrderPage} from '../goods-order/goods-order';
import {GoodsPage} from '../goods/goods'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = GoodsPage;
  tab3Root: any = GoodsOrderPage;
  tab4Root: any = ContactPage;

  constructor() {

  }
}
