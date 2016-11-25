/**
 * Created by zhuzhui on 2016/11/25.
 */
import {Injectable} from '@angular/core';
import {Fetch} from "emiya-angular2-fetch";
import {Token} from 'emiya-angular2-token';

@Injectable()

export class User {
    constructor(private fetch: Fetch) {

    }

    login(username, password) {
        return this.fetch.request({
            'url': 'login',
            'method': 'post',
            data: {
                username: username,
                password: password
            }
        }).then(data => {
            // Token.set('token',data['data']);
            return data;
        }).catch(err => {
            alert(err);
        })
    }
}



