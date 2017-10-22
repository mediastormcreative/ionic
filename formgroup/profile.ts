import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

import { LoginPage } from '../login/login';
import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  adminForm: FormGroup;
  pwdForm: FormGroup;
  private myData: any;
  private myPwd: any;
  adminPassword:number = 1234;
  accessAdmin:boolean = false;

  userName:string;
  userEmail:string;
  userTel:string;
  userImg:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              public viewCtrl: ViewController,
              private builder: FormBuilder,
              private afDB: AngularFireDatabase,
              public alertCtrl: AlertController  ) {

                this.adminForm = builder.group({
                  'name': '',
                  'description' : ''
                });

                this.pwdForm = builder.group({
                  'adminPwd': ''
                });

                this.afAuth.authState.subscribe(user => {
                  this.userName= user.displayName;
                  this.userEmail=user.email;
                  this.userTel= user.phoneNumber,
                  this.userImg= user.photoURL;
              });
  }

  ionViewDidLoad() {
  }

  signOut() {
   this.afAuth.auth.signOut();
   this.navCtrl.push(LoginPage);
 }

 goToEmailReset() {
  this.navCtrl.push(ResetPasswordPage);
}

 closeModal() {
   this.viewCtrl.dismiss();
 }

 pwdAdmin(formData) {
   this.myPwd = formData;
   //console.log('Pasword is ' + this.myPwd.adminPwd);
   if (this.myPwd.adminPwd == this.adminPassword) {
    this.accessAdmin = true;    
   } else {
     this.showAlert();
   }
 }

  wltAdmin(formData) {
    this.myData = formData;
    firebase.database().ref('News').push({
      name : this.myData.name,
      description: this.myData.description,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }).then(res => {
      this.newsAlert();
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Password',
      subTitle: 'Please re-enter your password.... unless you should not be here.',
      buttons: ['OK']
    });
    alert.present();
  }

  newsAlert() {
    let alert = this.alertCtrl.create({
      title: 'Thank You!',
      subTitle: 'Your announcement has been posted.',
      buttons: ['OK']
    });
    alert.present();
  }

}
