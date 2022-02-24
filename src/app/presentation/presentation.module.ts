import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { DataModule } from '../data/data.module';

import { PresentationRoutingModule } from './presentation-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { SharedModule } from './_shared/shared.module';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    CommonModule,
    PresentationRoutingModule,
    AngularMaterialModule,
    CoreModule,
    DataModule,
    SharedModule,
    HomeModule
  ],
  exports: [
    PresentationRoutingModule
  ]
})
export class PresentationModule { }