import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from 'src/app/core/guards/module-import.guard';
import { SharedModule } from '../_shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
    declarations: [
        CategoryListComponent,
        CategoryComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CategoriesRoutingModule,
    ]
})
export class CategoriesModule {
    constructor(@Optional() @SkipSelf() parentModule: CategoriesModule) {
        throwIfAlreadyLoaded(parentModule, 'CategoriesModule');
    }
}
