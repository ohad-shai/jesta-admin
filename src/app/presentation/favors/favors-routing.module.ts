import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';
import { ComponentMode } from '../_shared/objects/component-mode';

import { FavorListComponent } from './favor-list/favor-list.component';
import { FavorComponent } from './favor/favor.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: '', component: FavorListComponent }]
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'create', component: FavorComponent, data: { mode: ComponentMode.Create } },
            { path: ':id', component: FavorComponent, data: { mode: ComponentMode.Read } },
            { path: ':id/edit', component: FavorComponent, data: { mode: ComponentMode.Update } },
            { path: ':id/delete', component: FavorComponent, data: { mode: ComponentMode.Delete } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FavorsRoutingModule { }
