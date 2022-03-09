import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';

import { SettingListComponent } from './setting-list/setting-list.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: '', component: SettingListComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
