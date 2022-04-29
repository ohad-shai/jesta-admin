import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { FavorsRoutingModule } from './favors-routing.module';

import { FavorListComponent } from './favor-list/favor-list.component';
import { FavorComponent } from './favor/favor.component';

@NgModule({
    declarations: [
        FavorListComponent,
        FavorComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FavorsRoutingModule
    ]
})
export class FavorsModule {
    constructor(@Optional() @SkipSelf() parentModule: FavorsModule) {
        throwIfAlreadyLoaded(parentModule, 'FavorsModule');
    }
}
