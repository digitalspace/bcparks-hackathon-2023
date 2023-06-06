import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-container-wildfire',
  templateUrl: './accordion-container-wildfire.component.html',
  styleUrls: ['./accordion-container-wildfire.component.scss'],
})
export class AccordionContainerWildfireComponent {
  @Input() data = [];
}
