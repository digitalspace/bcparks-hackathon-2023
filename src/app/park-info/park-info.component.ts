import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-park-info',
  templateUrl: './park-info.component.html',
  styleUrls: ['./park-info.component.scss'],
})
export class ParkInfoComponent {
  @Input() park = null;
  @Input() dayUseData = null;
}
