import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgChartsModule } from 'ng2-charts';

import { DashboardHomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    NgChartsModule
  ]
})
export class DashboardModule {
  constructor(@Optional() @SkipSelf() parentModule: DashboardModule) {
    throwIfAlreadyLoaded(parentModule, 'DashboardModule');
  }
}
