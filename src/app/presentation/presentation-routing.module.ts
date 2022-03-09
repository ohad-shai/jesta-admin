import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favors',
    loadChildren: () => import('./favors/favors.module').then(m => m.FavorsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'competitions',
    loadChildren: () => import('./competitions/competitions.module').then(m => m.CompetitionsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'managers',
    loadChildren: () => import('./managers/managers.module').then(m => m.ManagersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./general/general.module').then(m => m.GeneralModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PresentationRoutingModule { }
