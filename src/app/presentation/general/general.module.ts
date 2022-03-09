import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        GeneralRoutingModule
    ]
})
export class GeneralModule {
    constructor(@Optional() @SkipSelf() parentModule: GeneralModule) {
        throwIfAlreadyLoaded(parentModule, 'GeneralModule');
    }
}
