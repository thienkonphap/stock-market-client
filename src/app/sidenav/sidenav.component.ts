import { Component, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { navBarData } from './nav-data';

interface SideNaveToggle {
  screenWidth: number;
  collapse: boolean;
}
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  @Output() onToggleSideNav: EventEmitter<SideNaveToggle> = new EventEmitter();
  collapse = true;
  navData = navBarData;
  screenWidth = 0;
  closeSideNav(): void {
    this.collapse = !this.collapse;
    this.onToggleSideNav.emit({collapse: this.collapse, screenWidth: this.screenWidth});
  }
  toggleCollapse(): void {
    this.collapse = false;
    this.onToggleSideNav.emit({collapse: this.collapse, screenWidth: this.screenWidth});
  }
}
