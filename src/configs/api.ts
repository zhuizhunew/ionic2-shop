/**
 * Created by zhuzhui on 2016/11/22.
 */
import {Token} from 'emiya-angular2-token';

export const preUrl = 'http://112.74.169.211:9999';

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
  },
  'goodsSku': {
    'url': {
      'dev':'/food/rest/default/V1/categories/:sku/products',
      'release':'/food/rest/default/V1/categories/:sku/products',
    },
    'method': 'get',
  },
  'goodsDetail': {
    'url': {
      'dev': '/food/rest/default/V1/products/:sku',
      'release': '/food/rest/default/V1/products/:sku',
    },
    'method': 'get',
  },
  'goodsSubDetail': {
    'url': {
      'dev': '/food/rest/default/V1/configurable-products/:sku/children',
      'release': '/food/rest/default/V1/configurable-products/:sku/children',
    },
    'method':'get',
  },
  'color': {
    'url': {
      'dev': '/food/rest/default/V1/products/attributes/color',
      'release': '/food/rest/default/V1/products/attributes/color',
    },
    'method': 'get',
  },
  'size': {
    'url': {
      'dev': '/food/rest/default/V1/products/attributes/size',
      'release': '/food/rest/default/V1/products/attributes/size',
    },
    'method': 'get',
  },
  'pattern': {
    'url': {
      'dev': '/food/rest/default/V1/products/attributes/pattern',
      'release': '/food/rest/default/V1/products/attributes/pattern',
    },
    'method': 'get',
  },
  'climate': {
    'url': {
      'dev': '/food/rest/default/V1/products/attributes/climate',
      'release': '/food/rest/default/V1/products/attributes/climate',
    },
    'method': 'get',
  },
  'material': {
    'url': {
      'dev': '/food/rest/default/V1/products/attributes/material',
      'release': '/food/rest/default/V1/products/attributes/material',
    },
    'method': 'get',
  },
  'style_general': {
    'url': {
      'dev': '/food/rest/default/V1/products/attributes/style_general',
      'release': '/food/rest/default/V1/products/attributes/style_general',
    },
    'method': 'get',
  },
  'style_bottom': {
    'url': {
      'dev': '/food/rest/default/V1/products/attributes/style_bottom',
      'release': '/food/rest/default/V1/products/attributes/style_bottom',
    },
    'method': 'get',
  },
  'login': {
    'url': {
      'dev': '/food/rest/default/V1/integration/customer/token',
      'release': '/food/rest/default/V1/integration/customer/token',
    },
    'method': 'post',
    'getTokens': [{
      'token_receive_mode': 'payload',
      'token_receive_path': null,
      'token_map': 'token',
      'token_storage_method': 'local'
    }]
  }
}

export const proxy = [
  {
    "path": "/food/",
    "proxyUrl": "http://112.74.169.211:9999/food/"
  }]

