import { Component, ViewChild } from '@angular/core';
import { MapConstants } from '../constants/map-constants';
import { DataService } from '../services/data.service';
import { Observable, Subscription } from 'rxjs';
import { MapInfoWindow } from '@angular/google-maps';
import { MapRoutingService } from '../services/map-routing.service';
import { MapControlsService } from '../services/map-controls.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  private subscriptions = new Subscription();

  public mapOptions = MapConstants.mapOptions;
  public mapData = {};
  public mainPolygon;
  public directionsResults$: Observable<google.maps.DirectionsResult | undefined>;
  public showBoundary = false;

  constructor(
    private dataService: DataService,
    private mapRoutingService: MapRoutingService,
    private mapControlsService: MapControlsService
  ) {
    this.subscriptions.add(
      this.dataService.mapData.subscribe((res) => {
        this.mapData = res;
      })
    );

    this.subscriptions.add(
      this.mapRoutingService.mainPolygon.subscribe((res) => {
        this.mainPolygon = res;

        // TODO: Fix this.
        // We do this because we have no idea when mapDirectionsService will give us a response in render route
        this.dataService.updateAll(
          this.mapRoutingService.mainPolygon.getValue(),
          this.mapControlsService.limitSearchBoundary.getValue()
        );
      })
    );

    this.subscriptions.add(
      this.mapRoutingService.directionsResults$.subscribe((res) => {
        this.directionsResults$ = res;
      })
    );

    this.subscriptions.add(
      this.mapControlsService.showBoundary.subscribe((res) => {
        this.showBoundary = res;
      })
    );
  }

  openInfoWindow(marker, infoWindow) {
    this.infoWindow.infoWindow.setContent(infoWindow);
    this.infoWindow.open(marker);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
