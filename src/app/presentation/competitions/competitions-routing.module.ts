import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';

import { CompetitionListComponent } from './competition-list/competition-list.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: '', component: CompetitionListComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompetitionsRoutingModule { }
