import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountComponent} from './account/account.component';
import {StatsComponent} from './stats/stats.component';
import {DocsComponent} from './docs/docs.component';

import { ModalComponent } from './_helpers/directives/modal.component';
import { ModalService } from './_helpers/services/modal.service';

import {ChartModule} from 'angular-highcharts';
import * as highstock from 'highcharts/modules/stock.src';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';

StockModule(Highcharts);

import {TimeAgoPipe} from './_helpers/pipes/time-ago.pipe';
import {HashPowerConverterPipe} from './_helpers/pipes/hash-power-converter.pipe';
import {JsonToNgForPipe} from './_helpers/pipes/json-to-ngfor.pipe';

@NgModule({
  declarations: [
    // components
    AppComponent,
    DashboardComponent,
    AccountComponent,
    StatsComponent,
    DocsComponent,
    ModalComponent,

    // pipes
    TimeAgoPipe,
    HashPowerConverterPipe,
    JsonToNgForPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartModule,
    FormsModule
  ],
  providers: [{provide: ChartModule, useFactory: () => [highstock]}, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
