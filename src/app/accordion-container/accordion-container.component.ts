import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { MapRoutingService } from '../services/map-routing.service';
import { MapControlsService } from '../services/map-controls.service';

@Component({
  selector: 'app-accordion-container',
  templateUrl: './accordion-container.component.html',
  styleUrls: ['./accordion-container.component.scss'],
})
export class AccordionContainerComponent {
  private subscriptions = new Subscription();

  public mapData = {};
  public mainPolygon = null;
  public limitSearchBoundary = false;

  constructor(
    private dataService: DataService,
    private mapRoutingService: MapRoutingService,
    private mapControlsService: MapControlsService
  ) {
    this.subscriptions.add(
      this.dataService.mapData.subscribe((res) => {
        // If we want to change order of accordion, we should turn this into an array and set order with that.
        this.mapData = res;
      })
    );

    this.subscriptions.add(
      this.mapRoutingService.mainPolygon.subscribe((res) => {
        this.mainPolygon = res;
      })
    );

    this.subscriptions.add(
      this.mapControlsService.limitSearchBoundary.subscribe((res) => {
        this.limitSearchBoundary = res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
