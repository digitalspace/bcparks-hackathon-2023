import { Component } from '@angular/core';
import { MapControlsService } from '../services/map-controls.service';
import { MapRoutingService } from '../services/map-routing.service';

@Component({
  selector: 'app-show-boundary-toggle',
  templateUrl: './show-boundary-toggle.component.html',
  styleUrls: ['./show-boundary-toggle.component.scss'],
})
export class ShowBoundaryToggleComponent {
  constructor(
    private mapControlsService: MapControlsService,
    private mapRoutingService: MapRoutingService
  ) {}

  showBoundaryChange() {
    this.mapControlsService.toggleBoundary();
    this.mapRoutingService.calculateParkPolygon();
    this.mapRoutingService.createPolygon();
  }
}
