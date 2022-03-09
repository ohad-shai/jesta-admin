import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';

import { ReportListComponent } from './report-list/report-list.component';

@NgModule({
    declarations: [
        ReportListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReportsRoutingModule
    ]
})
export class ReportsModule {
    constructor(@Optional() @SkipSelf() parentModule: ReportsModule) {
        throwIfAlreadyLoaded(parentModule, 'ReportsModule');
    }
}
