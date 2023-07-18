import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapControlsService {
  showBoundary = new BehaviorSubject(false);
  limitSearchBoundary = new BehaviorSubject(false);

  toggleBoundary() {
    this.showBoundary.next(!this.showBoundary.getValue());
  }

  toggleLimitSearchBoundary() {
    this.limitSearchBoundary.next(!this.limitSearchBoundary.getValue());
  }
}
