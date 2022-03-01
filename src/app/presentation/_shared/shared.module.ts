import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { AngularMaterialModule } from '../angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    RouterModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    AngularMaterialModule
  ]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    throwIfAlreadyLoaded(parentModule, 'SharedModule');
  }
}
