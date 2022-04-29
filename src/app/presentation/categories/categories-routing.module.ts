import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';
import { ComponentMode } from '../_shared/objects/component-mode';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: '', component: CategoryListComponent }]
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'create', component: CategoryComponent, data: { mode: ComponentMode.Create } },
            { path: ':id', component: CategoryComponent, data: { mode: ComponentMode.Read } },
            { path: ':id/edit', component: CategoryComponent, data: { mode: ComponentMode.Update } },
            { path: ':id/delete', component: CategoryComponent, data: { mode: ComponentMode.Delete } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }
