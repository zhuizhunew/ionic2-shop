import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the NewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-page',
  templateUrl: 'new-page.html'
})
export class NewPagePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello NewPagePage Page');
  }

}
