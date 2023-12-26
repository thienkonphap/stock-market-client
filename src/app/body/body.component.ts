import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  @Input() collapse = false;
  @Input() screenWidth = 0;
  getBodyClass(): String {
    let styleClass = '';
    if (this.collapse && this.screenWidth < 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapse && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
