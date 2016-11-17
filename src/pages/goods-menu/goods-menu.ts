import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, AlertController} from 'ionic-angular';

@Component({
  templateUrl: 'goods-menu.html',
})

export class PopoverPage {
  public goodsData: any;
  public totalMoney: any;
  public totalAmount: any;
  public checkImg = '../../assets/icon/ic_check_black_24px.svg';

  constructor(public viewCtrl: ViewController, private params: NavParams, private alertCtrl: AlertController) {
    this.goodsData = this.params.data.data.goodsMenu;
    this.goodsData.map(item => {
      return item.checkImg = '../../assets/icon/ic_check_black_24px.svg';
    })
    this.totalMoney = this.params.data.data.goodsMenu.count * this.params.data.data.goodsMenu.price;
    this.totalAmount = this.params.data.data.totalAmount;
  }

  close() {
    this.viewCtrl.dismiss(undefined, undefined, {duration: 1000, animate: false});
  }

  plus(obj) {
    if (obj.checkImg == '../../assets/icon/ic_check_white_24px.svg') {
      this.check(obj);
    }
    let i = this.goodsData.indexOf(obj);
    this.goodsData[i].count += 1;
    this.totalMoney += obj.price;
    this.params.data.data.totalMoney += obj.price;
    this.params.data.data.totalAmount ++;
  }

  reduce(obj) {
    if (obj.checkImg == '../../assets/icon/ic_check_white_24px.svg') {
      this.check(obj);
    }
    this.totalMoney -= obj.price;
    let i = this.goodsData.indexOf(obj);
    if (obj.count > 1) {
      this.goodsData[i].count--;
    } else {
      obj.count--;
      this.goodsData.splice(i, 1);
    }
    this.params.data.data.totalMoney -= obj.price;
    this.params.data.data.totalAmount --;
    if (this.params.data.data.totalMoney == 0) {
      this.close();
    }
  }

  check(obj) {
    if (obj.checkImg == '../../assets/icon/ic_check_black_24px.svg') {
      obj.checkImg = '../../assets/icon/ic_check_white_24px.svg';
      this.params.data.data.totalMoney -= obj.price * obj.count;
      this.totalAmount -= obj.count;
    } else if (obj.checkImg == '../../assets/icon/ic_check_white_24px.svg') {
      obj.checkImg = '../../assets/icon/ic_check_black_24px.svg';
      this.params.data.data.totalMoney += obj.price * obj.count;
      this.totalAmount += obj.count;
    }
  }

  checkAll() {
    if (this.checkImg == '../../assets/icon/ic_check_black_24px.svg') {
      this.checkImg = '../../assets/icon/ic_check_white_24px.svg';
      this.goodsData.map(item => {
        return item.checkImg = '../../assets/icon/ic_check_white_24px.svg';
      })
      this.params.data.data.totalMoney = 0.00;
      this.totalAmount = 0;
    } else {
      this.checkImg = '../../assets/icon/ic_check_black_24px.svg';
      this.goodsData.map(item => {
        this.params.data.data.totalMoney += (item.count * item.price);
        return item.checkImg = '../../assets/icon/ic_check_black_24px.svg';
      })
      this.totalAmount = this.params.data.data.totalAmount;
    }
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
    this.params.data.data.goodsMenu.map(item => {
      item.count = 0;
    })
    this.params.data.data.goodsMenu = [];
    this.params.data.data.totalMoney = 0.00;
    this.params.data.data.totalAmount = 0;
    this.close();
  }
}
