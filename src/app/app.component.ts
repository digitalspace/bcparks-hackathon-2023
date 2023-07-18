import { Component } from '@angular/core';
import { EasterEggService } from './services/easter-egg.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bcparks-hack-map';

  private subscriptions = new Subscription();

  public konamiTriggered = false;

  constructor(protected easterEggService: EasterEggService) {
    // Easter Egg
    this.subscriptions.add(
      easterEggService.konamiTriggered.subscribe((trigger) => {
        this.konamiTriggered = trigger;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
