import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, skip } from 'rxjs';
import { DriveBCEventsService } from './drive-bc-events.service';
import { DriveBCWebcamsService } from './drive-bc-webcams.service';
import { WildfireService } from './wildfire.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public mapData = new BehaviorSubject({});
  private subscriptions = new Subscription();

  private isUpdating = false;

  constructor(
    protected driveBCEventsService: DriveBCEventsService,
    protected driveBCWebcamsService: DriveBCWebcamsService,
    protected wildfireService: WildfireService
  ) {
    // Drive BC Webcams
    this.subscriptions.add(
      this.driveBCWebcamsService.mapData.pipe(skip(1)).subscribe((res) => {
        this.updateMapData(res);
      })
    );

    // Drive BC Events
    this.subscriptions.add(
      this.driveBCEventsService.mapDataConstruction.pipe(skip(1)).subscribe((res) => {
        this.updateMapData(res);
      })
    );
    this.subscriptions.add(
      this.driveBCEventsService.mapDataIncedent.pipe(skip(1)).subscribe((res) => {
        this.updateMapData(res);
      })
    );
    this.subscriptions.add(
      this.driveBCEventsService.mapDataSpecialEvent.pipe(skip(1)).subscribe((res) => {
        this.updateMapData(res);
      })
    );
    this.subscriptions.add(
      this.driveBCEventsService.mapDataWeatherCondition.pipe(skip(1)).subscribe((res) => {
        this.updateMapData(res);
      })
    );

    // WF
    this.subscriptions.add(
      this.wildfireService.mapDataOOC.pipe(skip(1)).subscribe((res) => {
        this.updateMapData(res);
      })
    );
    this.subscriptions.add(
      this.wildfireService.mapDataHeld.pipe(skip(1)).subscribe((res) => {
        this.updateMapData(res);
      })
    );
    this.subscriptions.add(
      this.wildfireService.mapDataUnderControl.pipe(skip(1)).subscribe((res) => {
        this.updateMapData(res);
      })
    );
  }

  updateAll(mainPolygon, limitSearchBoundary) {
    if (this.driveBCWebcamsService.showData.getValue()) {
      this.driveBCWebcamsService.getData(mainPolygon, limitSearchBoundary);
    }
    if (this.driveBCEventsService.showData.getValue()) {
      this.driveBCEventsService.getData(mainPolygon, limitSearchBoundary);
    }
    if (this.wildfireService.showData.getValue()) {
      this.wildfireService.getData(mainPolygon, limitSearchBoundary);
    }
  }

  updateMapData(item) {
    if (!this.isUpdating) {
      this.isUpdating = true;
      let updatedMapData = this.mapData.getValue();
      updatedMapData[item.id] = item;
      this.mapData.next(updatedMapData);
      this.isUpdating = false;
    } else {
      // Try again in a second
      setTimeout(() => {
        this.updateMapData(item);
      }, 1000);
    }
  }

  removeMapData(id) {
    if (!this.isUpdating) {
      this.isUpdating = true;
      let updatedMapData = this.mapData.getValue();
      delete updatedMapData[id];
      this.mapData.next(updatedMapData);
      this.isUpdating = false;
    } else {
      // Try again in a second
      setTimeout(() => {
        this.removeMapData(id);
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
