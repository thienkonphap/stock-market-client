import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';

interface SideNaveToggle {
  screenWidth: number;
  collapse: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidenavComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 
export class AppComponent {
  title = 'stock_market_client';

  isSideNavCollaped = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNaveToggle ): void {
    this.isSideNavCollaped = data.collapse;
    this.screenWidth = data.screenWidth;
  }
}
