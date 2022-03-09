import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { ContactsRoutingModule } from './contacts-routing.module';

import { ContactListComponent } from './contact-list/contact-list.component';

@NgModule({
    declarations: [
        ContactListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ContactsRoutingModule
    ]
})
export class ContactsModule {
    constructor(@Optional() @SkipSelf() parentModule: ContactsModule) {
        throwIfAlreadyLoaded(parentModule, 'ContactsModule');
    }
}
