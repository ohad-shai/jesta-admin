import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';

import { ReportListComponent } from './report-list/report-list.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: '', component: ReportListComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }
