import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';

import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [{ path: '', component: ContactListComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactsRoutingModule { }
