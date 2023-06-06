import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapRoutingService } from '../services/map-routing.service';

@Component({
  selector: 'app-driving-estimation',
  templateUrl: './driving-estimation.component.html',
  styleUrls: ['./driving-estimation.component.scss'],
})
export class DrivingEstimationComponent {
  private subscriptions = new Subscription();

  public distance;
  public duration;

  constructor(private mapRoutingService: MapRoutingService) {
    this.subscriptions.add(
      this.mapRoutingService.distance.subscribe((res) => {
        this.distance = res;
      })
    );
    this.subscriptions.add(
      this.mapRoutingService.duration.subscribe((res) => {
        this.duration = res;
      })
    );
  }
}
