/**
 * Created by zhuzhui on 2016/11/24.
 */
import {LoadingController} from 'ionic-angular';
import {Injectable} from '@angular/core';


@Injectable()
export class Loading {
  public loading: any;

  constructor(private loadingCtrl: LoadingController) {

  }

  presentLoadingDefault(content) {
    this.loading = this.loadingCtrl.create({
      content: content
    });

    this.loading.present();

    // setTimeout(() => {
    //   loading.dismiss();
    // }, 5000);
  }

  hideLoading() {
    this.loading.dismiss();
  }

}
