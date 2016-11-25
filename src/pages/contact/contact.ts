import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Header} from '../../directives/header/header';
import {Token} from 'emiya-angular2-token';
import {Router} from 'emiya-ionic2-router';
import {LoginPage} from '../login/login';
import {Event} from 'emiya-angular2-event';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  public showLogin:any;

  constructor(public navCtrl: NavController, private router: Router) {
    if(Token.get('token','local')){
      this.showLogin = false;
    }else {
      this.showLogin = true;
    }
    Event.subscribe('logout',()=> {this.showLogin = true})
    Event.subscribe('login',()=> {this.showLogin = false})
  }

  logout() {
    Token.delete('token','local');
    Event.emit('logout',{});
  }

  goLogin() {
    this.router.push(LoginPage);
  }

}
