/**
 * Created by zhuzhui on 2016/11/17.
 */
import {Component,Input} from '@angular/core';


@Component({
  selector: 'shopCart',
  templateUrl: 'shopcart-footer.html',
})


export class ShopCartPage{
  @Input() shopCart = {totalAmount: Number, totalMoney: Number};
  @Input() show: Function;
  constructor() {

  }
}
