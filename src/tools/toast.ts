/**
 * Created by zhuzhui on 2016/11/25.
 */
import {ToastController} from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()

export class Toast{
    constructor(private toast: ToastController){

    }

    toastAction(message) {
        let toastMessage = this.toast.create({
            message: message,
            duration: 1000,
            position: 'middle',
            cssClass: 'toast-class'
        });
        toastMessage.onDidDismiss(() => {
            console.log('Dismissed toast');
        })
        toastMessage.present();
    }
}