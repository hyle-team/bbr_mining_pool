import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { StatsComponent } from './stats/stats.component';
import { DocsComponent } from './docs/docs.component';

import {ResolverService} from './_helpers/services/api.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      resolverService: ResolverService
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      resolverService: ResolverService
    }
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
    path: '**',
    redirectTo: '',
    component: DashboardComponent,
    resolve: {
      resolverService: ResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ResolverService]
})
export class AppRoutingModule { }
