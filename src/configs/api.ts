/**
 * Created by zhuzhui on 2016/11/22.
 */


export const Api = {
  'goodsCategory': {
    'url': {
      'dev': '/food/rest/default/V1/categories',
      'release': '/food/rest/default/V1/categories'
    },
    'method': 'get',
  },
  'goodsList': {
    'url': {
      'dev': '/food/rest/default/V1/products',
      'release': '/food/rest/default/V1/products',
    },
    'method': 'get',
  }
}

export const proxy = [
  {
    "path": "/food/",
    "proxyUrl": "http://112.74.169.211:9999/food/"
  }]

export const preUrl = 'http://112.74.169.211:9999';
