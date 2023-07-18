import { NgModule } from '@angular/core';
import { DsBcgovMapComponent } from './ds-bcgov-map.component';
import { AccordionContainerComponent } from './accordion-container/accordion-container.component';
import { AccordionContainerDriveBcEventsComponent } from './accordion-container/data-components/accordion-container-drive-bc-events/accordion-container-drive-bc-events.component';
import { AccordionContainerDriveBcWebcamComponent } from './accordion-container/data-components/accordion-container-drive-bc-webcam/accordion-container-drive-bc-webcam.component';
import { AccordionContainerWildfireComponent } from './accordion-container/data-components/accordion-container-wildfire/accordion-container-wildfire.component';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { CheckboxSectionComponent } from './checkbox-section/checkbox-section.component';
import { DayuseAccordionItemComponent } from './dayuse-accordion-item/dayuse-accordion-item.component';
import { DrivingEstimationComponent } from './driving-estimation/driving-estimation.component';
import { LimitSearchBoundaryToggleComponent } from './limit-search-boundary-toggle/limit-search-boundary-toggle.component';
import { MapComponent } from './map/map.component';
import { ParkInfoComponent } from './park-info/park-info.component';
import { ParkSelectorComponent } from './park-selector/park-selector.component';
import { ShowBoundaryToggleComponent } from './show-boundary-toggle/show-boundary-toggle.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    DsBcgovMapComponent,
    ParkInfoComponent,
    DayuseAccordionItemComponent,
    AutocompleteInputComponent,
    MapComponent,
    DrivingEstimationComponent,
    LimitSearchBoundaryToggleComponent,
    ParkSelectorComponent,
    ShowBoundaryToggleComponent,
    CheckboxSectionComponent,
    AccordionContainerComponent,
    AccordionContainerWildfireComponent,
    AccordionContainerDriveBcEventsComponent,
    AccordionContainerDriveBcWebcamComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports: [DsBcgovMapComponent],
  providers: [],
})
export class DsBcgovMapModule {}
