import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-container-drive-bc-webcam',
  templateUrl: './accordion-container-drive-bc-webcam.component.html',
  styleUrls: ['./accordion-container-drive-bc-webcam.component.scss'],
})
export class AccordionContainerDriveBcWebcamComponent {
  @Input() data = [];
}
