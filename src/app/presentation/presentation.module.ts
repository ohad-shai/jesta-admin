import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from '../core/guards/module-import.guard';
import { CoreModule } from '../core/core.module';
import { DataModule } from '../data/data.module';
import { PresentationRoutingModule } from './presentation-routing.module';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    PresentationRoutingModule,
    AngularMaterialModule,
    CoreModule,
    DataModule
  ],
  exports: [
    PresentationRoutingModule
  ]
})
export class PresentationModule {
  constructor(@Optional() @SkipSelf() parentModule: PresentationModule) {
    throwIfAlreadyLoaded(parentModule, 'PresentationModule');
  }
}