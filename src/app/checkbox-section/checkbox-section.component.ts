import { Component } from '@angular/core';
import { MapRoutingService } from '../services/map-routing.service';
import { MapControlsService } from '../services/map-controls.service';
import { DataService } from '../services/data.service';
import { WildfireService } from '../services/wildfire.service';
import { DriveBCEventsService } from '../services/drive-bc-events.service';
import { DriveBCWebcamsService } from '../services/drive-bc-webcams.service';

@Component({
  selector: 'app-checkbox-section',
  templateUrl: './checkbox-section.component.html',
  styleUrls: ['./checkbox-section.component.scss'],
})
export class CheckboxSectionComponent {
  // TODO: This will be part of a profile config.
  public dataSources = {
    [this.driveBCWebcamsService.dataId]: {
      show: false,
      label: this.driveBCWebcamsService.label,
      serviceRef: this.driveBCWebcamsService,
    },
    [this.driveBCEventsService.dataId]: {
      show: false,
      label: this.driveBCEventsService.label,
      serviceRef: this.driveBCEventsService,
    },
    [this.wildfireService.dataId]: {
      show: false,
      label: this.wildfireService.label,
      serviceRef: this.wildfireService,
    },
  };
  constructor(
    private mapRoutingService: MapRoutingService,
    private mapControlsService: MapControlsService,
    private dataService: DataService,
    private wildfireService: WildfireService,
    private driveBCEventsService: DriveBCEventsService,
    private driveBCWebcamsService: DriveBCWebcamsService
  ) {}

  toggleEvent(id) {
    this.dataSources[id].serviceRef.showData.next(this.dataSources[id].show);
    if (this.dataSources[id].show) {
      // Refresh data
      this.dataSources[id].serviceRef.getData(
        this.mapRoutingService.mainPolygon.getValue(),
        this.mapControlsService.limitSearchBoundary.getValue()
      );
    } else {
      // Delete
      // TODO: We may just want this to be a hide

      // TODO: When we split our data gets and create separate toggles for the data this code will be redundant.
      switch (id) {
        case this.driveBCEventsService.dataId:
          this.dataService.removeMapData(this.driveBCEventsService.dataIdConstruction);
          this.dataService.removeMapData(this.driveBCEventsService.dataIdIncedent);
          this.dataService.removeMapData(this.driveBCEventsService.dataIdSpecialEvent);
          this.dataService.removeMapData(this.driveBCEventsService.dataIdWeatherCondition);
          break;
        case this.wildfireService.dataId:
          this.dataService.removeMapData(this.wildfireService.dataIdHeld);
          this.dataService.removeMapData(this.wildfireService.dataIdOOC);
          this.dataService.removeMapData(this.wildfireService.dataIdUnderControl);
          break;
        default:
          this.dataService.removeMapData(id);
          break;
      }
    }
  }
}
