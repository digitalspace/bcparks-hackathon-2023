import { Component } from '@angular/core';
import { ParkConstants } from '../constants/park-constants';
import { MapRoutingService } from '../services/map-routing.service';
import { DayuseService } from '../services/dayuse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-park-selector',
  templateUrl: './park-selector.component.html',
  styleUrls: ['./park-selector.component.scss'],
})
export class ParkSelectorComponent {
  private subscriptions = new Subscription();

  public selectedPark = null;
  public parks = ParkConstants.parks;

  constructor(private mapRoutingService: MapRoutingService, private dayuseService: DayuseService) {
    this.subscriptions.add(
      this.mapRoutingService.mainPolygon.subscribe(async (res) => {
        if (res) {
          // TODO: Fix this.
          // We do this because we have no idea when mapDirectionsService will give us a response in render route
          await this.dayuseService.getDUPParks(this.selectedPark.orcs);
        }
      })
    );
  }

  async parkSelectEvent(park) {
    this.selectedPark = park;
    this.mapRoutingService.setSelectedPark(park);
    this.mapRoutingService.setSelectedDestination(park.lat, park.lng, true);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
