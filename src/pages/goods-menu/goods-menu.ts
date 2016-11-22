import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, AlertController} from 'ionic-angular';
import {DataPool,DataPoolHandle} from 'emiya-angular2-datapool';
import {Event} from 'emiya-angular2-event';
import {PlusReduce} from '../../directives/plus-reduce/plus-reduce';

@Component({
  templateUrl: 'goods-menu.html',
})

export class PopoverPage {
  public goodsData: any;
  public totalMoney: any;
  public totalAmount: any;
  public checkImg = 'assets/icon/ic_check_black_24px.svg';
  public shopCart = {goodsMenu: [], totalMoney: 0, totalAmount: 0, selectedGoodsAmount: 0};

  constructor(public viewCtrl: ViewController, private params: NavParams, private alertCtrl: AlertController, private dataPool: DataPool) {
    dataPool.request('goods_cart').onChange(() => {
      // console.log('dataPool onchange');
      dataPool.request('goods_cart').read('goodsCart').then(data => {
        // console.log('data pool change',data['goods']);
        this.shopCart = data['goods'];
        // this.goodsData = this.shopCart.goodsMenu;
        let selected = [];
        this.shopCart.goodsMenu.map(item => {
          selected.push(item.selected);
          if(item['selected']) {
            item.checkImg = 'assets/icon/ic_check_black_24px.svg';
          }else {
            item.checkImg = 'assets/icon/ic_check_white_24px.svg';
          }
        })
        if(selected.indexOf(false) > -1) {
          this.checkImg = 'assets/icon/ic_check_white_24px.svg';
        }else {
          this.checkImg = 'assets/icon/ic_check_black_24px.svg';
        }
        // this.totalMoney = this.shopCart.totalMoney;
        // this.totalAmount = this.shopCart.totalAmount;
        // console.log('this.shopCart new',this.shopCart);
      })
    })

    Event.subscribe('noGoods',() => {
      this.close();
    })
    // this.shopCart.goodsMenu.map(item => {
    //   return item.checkImg = 'assets/icon/ic_check_black_24px.svg';
    // })
    // this.goodsData = this.shopCart.goodsMenu;
    // this.goodsData.map(item => {
    //   return item.checkImg = 'assets/icon/ic_check_black_24px.svg';
    // })
    // this.totalMoney = this.shopCart.totalMoney;
    // this.totalAmount = this.shopCart.totalAmount;
    // this.dataPoolChange();
  }

  // dataPoolChange() {
  //   this.dataPool.request('goods_cart').onChange(() => {
  //     console.log('dataPool onchange');
  //   })
  // }

  ionViewWillEnter() {
    // console.log("document.getElementsByClassName('ion-backdrop')[0]",document.getElementsByClassName('popover-content')[0]);
    // console.log('screen.height',screen.height);
    document.getElementsByTagName('ion-popover')[0]['style'].height = screen.height - 50 + 'px';
    document.getElementsByTagName('ion-backdrop')[0]['style'].height = screen.height - 50 + 'px';
  }

  close() {
    this.viewCtrl.dismiss(undefined, undefined, {duration: 1000, animate: false});
  }

  // plus(obj) {
  //   console.log(obj);
  //   if (obj.checkImg == 'assets/icon/ic_check_white_24px.svg') {
  //     this.check(obj);
  //   }
  //   let i = this.shopCart.goodsMenu.indexOf(obj);
  //   this.shopCart.goodsMenu[i].count += 1;
  //   // this.totalMoney += obj.price;
  //   this.shopCart.totalMoney += obj.price;
  //   this.shopCart.totalAmount ++;
  //   this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
  //   Event.emit('refreshCount',{});
  // }
  //
  // reduce(obj) {
  //   if (obj.checkImg == 'assets/icon/ic_check_white_24px.svg') {
  //     this.check(obj);
  //   }
  //   // this.totalMoney -= obj.price;
  //   let i = this.shopCart.goodsMenu.indexOf(obj);
  //   if (obj.count > 1) {
  //     this.shopCart.goodsMenu[i].count--;
  //   } else {
  //     obj.count--;
  //     this.shopCart.goodsMenu.splice(i, 1);
  //   }
  //   this.shopCart.totalMoney -= obj.price;
  //   this.shopCart.totalAmount --;
  //   if (this.shopCart.totalMoney == 0) {
  //     this.close();
  //   }
  //   this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
  //   Event.emit('refreshCount',{});
  // }

  check(obj) {
    if (obj.selected) {
      obj.selected = !obj.selected;
      // obj.checkImg = 'assets/icon/ic_check_white_24px.svg';
      this.shopCart.totalMoney -= obj.price * obj.count;
      this.shopCart.totalAmount -= obj.count;
    } else {
      obj.selected = !obj.selected;
      // obj.checkImg = 'assets/icon/ic_check_black_24px.svg';
      this.shopCart.totalMoney += obj.price * obj.count;
      this.shopCart.totalAmount += obj.count;
    }
    this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
  }

  checkAll() {
    if (this.checkImg == 'assets/icon/ic_check_black_24px.svg') {
      this.checkImg = 'assets/icon/ic_check_white_24px.svg';
      this.shopCart.goodsMenu.map(item => {
        return item.selected = false;
      })
      this.shopCart.totalMoney = 0.00;
      this.shopCart.totalAmount = 0;
    } else {
      this.checkImg = 'assets/icon/ic_check_black_24px.svg';
      this.shopCart.goodsMenu.map(item => {
        this.shopCart.totalMoney += (item.count * item.price);
        return item.selected = true;
      })
      this.shopCart.goodsMenu.map(item => {
        this.shopCart.totalAmount += item.count;
      })
      // this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
      // this.shopCart.totalAmount = this.shopCart.totalAmount;
    }
    this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
  }

  clearAllGoods() {
    let alert = this.alertCtrl.create({
      message: '清空购物车中所有商品？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('quxiao')
          }
        },
        {
          text: '确定',
          handler: this.clearShopCart.bind(this)
        }
      ]
    });
    alert.present();
  }

  clearShopCart() {
    this.shopCart.goodsMenu = [];
    this.shopCart.totalMoney = 0.00;
    this.shopCart.totalAmount = 0;
    this.shopCart.selectedGoodsAmount = 0;
    console.log('this.shopCart',this.shopCart);
    this.dataPool.request('goods_cart').write('goodsCart', {goods: this.shopCart});
    Event.emit('clearShopcart',{});
    Event.emit('noGoods',{});
    this.close();
  }
}
