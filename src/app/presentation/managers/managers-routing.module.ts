import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';
import { ComponentMode } from '../_shared/objects/component-mode';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: '', component: ManagerListComponent }]
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'create', component: ManagerComponent, data: { mode: ComponentMode.Create } },
            { path: ':id', component: ManagerComponent, data: { mode: ComponentMode.Read } },
            { path: ':id/edit', component: ManagerComponent, data: { mode: ComponentMode.Update } },
            { path: ':id/delete', component: ManagerComponent, data: { mode: ComponentMode.Delete } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagersRoutingModule { }
