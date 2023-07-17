import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParkInfoComponent } from './park-info/park-info.component';
import { DayuseAccordionItemComponent } from './dayuse-accordion-item/dayuse-accordion-item.component';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { MapComponent } from './map/map.component';
import { DrivingEstimationComponent } from './driving-estimation/driving-estimation.component';
import { LimitSearchBoundaryToggleComponent } from './limit-search-boundary-toggle/limit-search-boundary-toggle.component';
import { ParkSelectorComponent } from './park-selector/park-selector.component';
import { ShowBoundaryToggleComponent } from './show-boundary-toggle/show-boundary-toggle.component';
import { CheckboxSectionComponent } from './checkbox-section/checkbox-section.component';
import { AccordionContainerComponent } from './accordion-container/accordion-container.component';
import { AccordionContainerDriveBcEventsComponent } from './accordion-container/data-components/accordion-container-drive-bc-events/accordion-container-drive-bc-events.component';
import { AccordionContainerDriveBcWebcamComponent } from './accordion-container/data-components/accordion-container-drive-bc-webcam/accordion-container-drive-bc-webcam.component';
import { AccordionContainerWildfireComponent } from './accordion-container/data-components/accordion-container-wildfire/accordion-container-wildfire.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
