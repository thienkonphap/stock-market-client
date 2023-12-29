import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TrendComponent } from './trend/trend.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService,HiloSeriesService } from '@syncfusion/ej2-angular-charts';
import { PriceInfoComponent } from './price-info/price-info.component';
interface SideNaveToggle {
  screenWidth: number;
  collapse: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavComponent, BodyComponent, HomeComponent, TrendComponent, ChartModule],
  templateUrl: './app.component.html',
  providers: [CategoryService, HiloSeriesService],
  styleUrls: ['./app.component.css']
}) 
export class AppComponent {
  title = 'stock_market_client';

  isSideNavCollaped = true;
  screenWidth = 0;

  onToggleSideNav(data: SideNaveToggle ): void {
    this.isSideNavCollaped = data.collapse;
    this.screenWidth = data.screenWidth;
  }
}
