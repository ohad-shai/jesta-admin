import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

import { SettingListComponent } from './setting-list/setting-list.component';

@NgModule({
    declarations: [
        SettingListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        SettingsRoutingModule
    ]
})
export class SettingsModule {
    constructor(@Optional() @SkipSelf() parentModule: SettingsModule) {
        throwIfAlreadyLoaded(parentModule, 'SettingsModule');
    }
}
