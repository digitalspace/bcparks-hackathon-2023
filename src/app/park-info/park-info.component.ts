import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { DayuseService } from '../services/dayuse.service';
import { MapRoutingService } from '../services/map-routing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-park-info',
  templateUrl: './park-info.component.html',
  styleUrls: ['./park-info.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ParkInfoComponent {
  public park = null;
  public dayUseData = null;

  private subscriptions = new Subscription();

  constructor(
    private dayUseService: DayuseService,
    private mapRoutingService: MapRoutingService
  ) {
    this.subscriptions.add(
      this.mapRoutingService.selectedPark.subscribe((res) => {
        this.park = res;
      })
    );

    this.subscriptions.add(
      this.dayUseService.data.subscribe((res) => {
        this.dayUseData = res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
