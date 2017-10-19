import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementsPage } from './announcements';

@NgModule({
  declarations: [
    AnnouncementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementsPage),
  ],
})
export class AnnouncementsPageModule {}
