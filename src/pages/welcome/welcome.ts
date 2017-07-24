import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { User } from "../../providers/user";

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,
    public user: User) {
    if (user.id) {
      this.navCtrl.setRoot(MainPage);
    }
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
