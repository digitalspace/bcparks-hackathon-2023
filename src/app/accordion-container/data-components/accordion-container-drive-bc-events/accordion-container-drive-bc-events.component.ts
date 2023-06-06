import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-container-drive-bc-events',
  templateUrl: './accordion-container-drive-bc-events.component.html',
  styleUrls: ['./accordion-container-drive-bc-events.component.scss'],
})
export class AccordionContainerDriveBcEventsComponent {
  @Input() data = [];
}
