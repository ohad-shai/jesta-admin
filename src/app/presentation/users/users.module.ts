import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule
    ]
})
export class UsersModule {
    constructor(@Optional() @SkipSelf() parentModule: UsersModule) {
        throwIfAlreadyLoaded(parentModule, 'UsersModule');
    }
}
