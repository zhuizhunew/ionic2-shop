/**
 * Created by zhuzhui on 2016/11/21.
 */
import {Component,Input} from '@angular/core';
import {Router} from 'emiya-ionic2-router';

@Component({
  selector: 'header',
  templateUrl: 'header.html',
})

export class Header{

  @Input() title:any;
  constructor(private router: Router) {

  }

  goBack() {
    this.router.popSafe();
  }
}
