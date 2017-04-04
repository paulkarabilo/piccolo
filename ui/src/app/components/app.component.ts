import { Component, Input } from '@angular/core';

@Component({
  selector: 'piccolo-root',
  templateUrl: '../templates/app.component.html',
  styleUrls: ['../styles/app.component.css']
})
export class AppComponent {
  @Input() url: string;
  title = 'piccolo!!!';
  
  onKey(event) {
    if (event.key === 'Enter') {
      console.log('WILL MINIFY' + this.url);
    }
  }
}
