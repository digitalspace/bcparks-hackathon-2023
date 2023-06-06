import { Component } from '@angular/core';
import { MapControlsService } from '../services/map-controls.service';
import { Subscription, skip } from 'rxjs';
import { DataService } from '../services/data.service';
import { MapRoutingService } from '../services/map-routing.service';

@Component({
  selector: 'app-limit-search-boundary-toggle',
  templateUrl: './limit-search-boundary-toggle.component.html',
  styleUrls: ['./limit-search-boundary-toggle.component.scss'],
})
export class LimitSearchBoundaryToggleComponent {
  private subscriptions = new Subscription();

  limitSearchBoundary = false;

  constructor(
    private mapRoutingService: MapRoutingService,
    private mapControlsService: MapControlsService,
    private dataService: DataService
  ) {
    this.subscriptions.add(
      this.mapControlsService.limitSearchBoundary.subscribe((res) => {
        this.limitSearchBoundary = res;
      })
    );
  }

  toggleLimitSearchBoundary() {
    this.mapControlsService.toggleLimitSearchBoundary();
    // TODO: do a fetch data somehow

    if (this.mapRoutingService.selectedOrigin.getValue() && this.mapRoutingService.selectedDestination.getValue()) {
      this.dataService.updateAll(this.mapRoutingService.mainPolygon.getValue(), this.limitSearchBoundary);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
