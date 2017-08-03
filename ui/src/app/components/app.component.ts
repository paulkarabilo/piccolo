import { Component, Input } from '@angular/core';
import { URLService } from '../services/URLService';

@Component({
  selector: 'piccolo-root',
  templateUrl: '../templates/app.component.html',
  styleUrls: ['../styles/app.component.css']
})
export class AppComponent {
  @Input() url: string;
  title: string = 'Piccolo - minimalistic URL minifier';
  minified: string;

  constructor(private urlService: URLService) {
    if (location.pathname.length > 1) {
      this.urlService.deminify(location.pathname.substr(1)).then(this.redirect)
    }
  }

  redirect(response) {
    if (response !== undefined) location = response;
  }
  
  onKey(event) : void {
    if (event.key === 'Enter') {
      this.urlService.minify(this.url).then((response) => this.showResponse(response));
    }
  }

  showResponse(response) : void {
    this.minified = `${location.origin}/${response}`;
  }
}
