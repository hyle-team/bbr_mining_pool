import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { StatsComponent } from './stats/stats.component';
import { DocsComponent } from './docs/docs.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'docs',
    component: DocsComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
