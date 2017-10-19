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

@IonicPage()
@Component({
  selector: 'page-amenities',
  templateUrl: 'amenities.html',
})
export class AmenitiesPage {

  amenitiesList:any;
  showPlayRooms: boolean = false;
  showThemeRooms: boolean = false;
  showSponsorRooms: boolean = false;

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
    this.afDB.list('/Amenities').subscribe(res => {
      this.amenitiesList = res;
      refresher.complete();
    })
  }

  showData() {
    this.afDB.list('/Amenities').subscribe(res => {
      this.amenitiesList = res;
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

 //Show/Hide events
 togglePlayRooms(){
   this.showPlayRooms = !this.showPlayRooms;
 }

 toggleSponsorRooms(){
   this.showSponsorRooms = !this.showSponsorRooms;
 }

 toggleThemeRooms(){
   this.showThemeRooms = !this.showThemeRooms;
 }

 //Boolean filter to show only amenities by name
 filter(target, value) : boolean{
    if (target.name == value){
      return false;
    }
    return true;
 }

}
