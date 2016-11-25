import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {Data} from '../../providers/data';
import {Http} from '@angular/http';
import {Header} from '../../directives/header/header';
import {Loading} from '../../tools/loading';
import {Router} from 'emiya-ionic2-router';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Data, Loading]
})
export class HomePage {

    constructor(public navCtrl: NavController, private platform: Platform, private data: Data,
                private http: Http, private loading: Loading, private router: Router) {
        // if (this.platform.is('ipad')) {
        //   console.log("I'm an iOS device!");
        // }else {
        //   console.log('not an IOS device');
        // }
    }

    goLogin() {
        this.router.push(LoginPage);
        // this.data.send();
    }

    // loadingAnimation() {
    //   // this.loading.presentLoadingDefault();
    // }

    // getData2() {
    //   this.http.get('local://getHomeData.json').subscribe((res) => console.log(res));
    //   // http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
    // }
}
