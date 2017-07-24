import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Api } from './api';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class User {

  public id: any;
  public token: any;

  constructor(public http: Http, public api: Api, public storage: Storage) {
    this.storage.get('_id')
      .then((id) => this.id = id);
    this.storage.get('_access_token')
      .then((token) => this.token = token);
  }

  public login(account: { email: string, password: string }): Observable<Response> {
    const callback = this.api.post('Developers/login', account).share();
    callback.map(res => res.json())
      .subscribe(
      res => this.loggedIn(res),
      err => console.error('ERROR', err));
    return callback;
  }

  public signup(account: { email: string, password: string }): Observable<Response> {
    const callback = this.api.post('Developers', account).share();
    callback.map(res => res.json())
      .subscribe(
      res => this.loggedIn(res),
      err => console.error('ERROR', err));
    return callback;
  }

  public logout() {
    this.storage.clear();
  }

  public loggedIn(resp) {
    this.storage.set('_id', resp.userId);
      this.id = resp.userId;
    this.storage.set('_access_token', resp.id);
      this.token = resp.id;
  }
}
