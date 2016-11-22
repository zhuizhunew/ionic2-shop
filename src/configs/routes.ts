/**
 * Created by zhuzhui on 2016/11/15.
 */

import {TabsPage} from '../pages/tabs/tabs';
import {GoodsInfoPage} from '../pages/goods-info/goods-info';
import {GoodsListPage} from '../pages/goods-list/goods-list';
import {GoodsOrderPage} from '../pages/goods-order/goods-order';
import {AboutPage} from '../pages/about/about';


export const Routes = {
  'Tabs': {
    page: TabsPage,
    params: {index:1},
    options: {duration:0},
    done: null,
    root: true,
    url: '/tabs',
    enable: true,
    title: '主页',
  },
  'goodsInfo': {
    page: GoodsInfoPage,
    url: '/goodsInfo',
    title: '商品详情页'
  },
  'goodsList': {
    page: GoodsListPage,
    url: '/goodsList',
    title: '商品列表页'
  },
  'goodsOrder': {
    page: GoodsOrderPage,
    url: '/goodsOrder',
    title: '结算'
  },
  'goods': {
    page: AboutPage,
    url: '/goods',
    title: '商品'
  }
}
