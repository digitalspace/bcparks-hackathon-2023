import { Component, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { EasterEggService } from '../services/easter-egg.service';
import { MapRoutingService } from '../services/map-routing.service';
import { MapConstants } from '../constants/map-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  private subscriptions = new Subscription();

  public autocompleteOriginId = MapConstants.autocompleteOriginId;
  public konamiTriggered = false;

  constructor(protected easterEggService: EasterEggService, private mapRoutingService: MapRoutingService) {
    // Easter Egg
    this.subscriptions.add(
      easterEggService.konamiTriggered.subscribe((trigger) => {
        this.konamiTriggered = trigger;
      })
    );
  }

  autocompleteEvent(id, place) {
    if (id === this.autocompleteOriginId) {
      this.mapRoutingService.setSelectedOrigin(place.geometry.location.lat(), place.geometry.location.lng(), true);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
