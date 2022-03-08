import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        LoginComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AccountRoutingModule
    ]
})
export class AccountModule {
    constructor(@Optional() @SkipSelf() parentModule: AccountModule) {
        throwIfAlreadyLoaded(parentModule, 'AccountModule');
    }
}
