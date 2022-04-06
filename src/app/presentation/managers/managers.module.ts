import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { ManagersRoutingModule } from './managers-routing.module';

import { ManagerListComponent } from './manager-list/manager-list.component';
import { ManagerComponent } from './manager/manager.component';

@NgModule({
    declarations: [
        ManagerListComponent,
        ManagerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ManagersRoutingModule
    ]
})
export class ManagersModule {
    constructor(@Optional() @SkipSelf() parentModule: ManagersModule) {
        throwIfAlreadyLoaded(parentModule, 'ManagersModule');
    }
}
