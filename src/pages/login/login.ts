import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Header} from '../../directives/header/header';
import {User} from '../../providers/user';
import {Toast} from '../../tools/toast';
import {Event} from 'emiya-angular2-event';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [User,Toast]
})
export class LoginPage {

  public username:any;
  public password:any;
  constructor(public navCtrl: NavController,private user: User, private toast: Toast) {}

  ionViewDidLoad() {
  }

  login() {
    // console.log(this.username);
    if(!this.username){
      this.toast.toastAction('Please enter your username');
      return
    }else if(!this.password) {
      this.toast.toastAction('Please enter your password');
      return
    }
    this.user.login(this.username,this.password).then(data=> {
      Event.emit('login',{});
    })
  }

}
