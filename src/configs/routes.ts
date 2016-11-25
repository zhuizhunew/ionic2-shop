/**
 * Created by zhuzhui on 2016/11/15.
 */

import {TabsPage} from '../pages/tabs/tabs';
import {GoodsInfoPage} from '../pages/goods-info/goods-info';
import {GoodsListPage} from '../pages/goods-list/goods-list';
import {GoodsOrderPage} from '../pages/goods-order/goods-order';
import {AboutPage} from '../pages/about/about';
import {LoginPage} from '../pages/login/login';


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
    tokens: ['token'],
    redirect: {
      name: 'login',
    },
    url: '/goodsOrder',
    title: '结算'
  },
  'goods': {
    page: AboutPage,
    url: '/goods',
    title: '商品'
  },
  'login': {
    page: LoginPage,
    url: '/login',
    title: '登录',
    params: null,
    options: null,
    tokens: ['token'],
    tokensLocation: ['local'],
    reverse: true,
    next: {
      name: 'goods',
      params: null,
      options: null,
      done: null,
      force: false
    },
    done: () => {console.log('go to login')}
  }
}
