import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrendComponent } from './trend/trend.component';
import { PriceInfoComponent } from './price-info/price-info.component';
import { NgChartsComponent } from './ng-charts/ng-charts.component';
import { HightlightChartComponent } from './hightlight-chart/hightlight-chart.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'trending', component: TrendComponent},
    {path: 'price', component: PriceInfoComponent},
    {path: 'chart', component: NgChartsComponent},
    {path: 'hightlight', component: HightlightChartComponent}
]; // add export here
