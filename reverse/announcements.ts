import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { DetailsPage } from '../details/details';

@IonicPage()
@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html',
})
export class AnnouncementsPage {

  newsList:any;
  items:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afDB: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public modalCtrl: ModalController ) {
}

  ionViewDidLoad() {
    this.showData();
  }

  refreshData(refresher) {
    this.afDB.list('/News').subscribe(res => {
      this.newsList = res;
      refresher.complete();
    })
  }


  showData() {
    this.afDB.list('/News', {
      query: {
        orderByChild: 'timestamp'
      }
    }).subscribe(res => {
      this.newsList = res;
      return this.newsList.reverse();
    })
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  goToProfile() {
    let modal = this.modalCtrl.create(ProfilePage);
    modal.present();
  }

}
