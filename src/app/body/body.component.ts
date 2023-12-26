import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  @Input() collapse = true;
  @Input() screenWidth = 0;
  getBodyClass(): String {
    let styleClass = '';
    if (!this.collapse) {
      styleClass = 'body-trimmed';
    } else if (this.collapse && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
