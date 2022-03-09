import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { CompetitionsRoutingModule } from './competitions-routing.module';

import { CompetitionListComponent } from './competition-list/competition-list.component';

@NgModule({
    declarations: [
        CompetitionListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CompetitionsRoutingModule
    ]
})
export class CompetitionsModule {
    constructor(@Optional() @SkipSelf() parentModule: CompetitionsModule) {
        throwIfAlreadyLoaded(parentModule, 'CompetitionsModule');
    }
}
