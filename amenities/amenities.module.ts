import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmenitiesPage } from './amenities';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AmenitiesPage
  ],
  imports: [
    IonicPageModule.forChild(AmenitiesPage),
    PipesModule
  ],
})
export class AmenitiesPageModule {}
