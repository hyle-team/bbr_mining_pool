import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component';
import { StatsComponent } from './stats/stats.component';
import { DocsComponent } from './docs/docs.component';

import { ChartModule } from 'angular-highcharts';
import { TimeAgoPipe } from './_helpers/pipes/time-ago.pipe';
import { HashPowerConverterPipe } from './_helpers/pipes/hash-power-converter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccountComponent,
    StatsComponent,
    DocsComponent,
    TimeAgoPipe,
    HashPowerConverterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
