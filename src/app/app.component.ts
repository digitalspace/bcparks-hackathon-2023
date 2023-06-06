import { Component, HostListener } from '@angular/core';
import { EasterEggService } from './services/easter-egg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bcparks-hack-map';

  constructor(private easterEggService: EasterEggService) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.easterEggService.processKeyPress(event.key);
  }
}
