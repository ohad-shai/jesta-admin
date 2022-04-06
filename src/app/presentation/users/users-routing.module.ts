import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';
import { ComponentMode } from '../_shared/objects/component-mode';

import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: '', component: UserListComponent }]
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'create', component: UserComponent, data: { mode: ComponentMode.Create } },
            { path: ':id', component: UserComponent, data: { mode: ComponentMode.Read } },
            { path: ':id/edit', component: UserComponent, data: { mode: ComponentMode.Update } },
            { path: ':id/delete', component: UserComponent, data: { mode: ComponentMode.Delete } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
