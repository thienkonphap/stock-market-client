import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendComponent } from './trend/trend.component';
import { PriceInfoComponent } from './price-info/price-info.component';
import { NgChartsComponent } from './ng-charts/ng-charts.component';
import { HightlightChartComponent } from './hightlight-chart/hightlight-chart.component';
import { MostViewComponent } from './most-view/most-view.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'trending', component: MostViewComponent},
    {path: 'companies', component: TrendComponent},
    {path: 'price', component: PriceInfoComponent},
    {path: 'chart', component: NgChartsComponent},
    {path: 'highlight/:symbol', component: HightlightChartComponent}
]; // add export here
