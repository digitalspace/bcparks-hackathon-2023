import { Component, ViewChild } from '@angular/core';
import { MapInfoWindow } from '@angular/google-maps';
import { MapConstants } from './constants/map-constants';
import { MapRoutingService } from './services/map-routing.service';

@Component({
  selector: 'lib-ds-bcgov-map',
  templateUrl: './ds-bcgov-map.component.html',
  styleUrls: ['./ds-bcgov-map.component.scss'],
})
export class DsBcgovMapComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  public autocompleteOriginId = MapConstants.autocompleteOriginId;

  constructor(private mapRoutingService: MapRoutingService) {}

  autocompleteEvent(id, place) {
    if (id === this.autocompleteOriginId) {
      this.mapRoutingService.setSelectedOrigin(place.geometry.location.lat(), place.geometry.location.lng(), true);
    }
  }
}
