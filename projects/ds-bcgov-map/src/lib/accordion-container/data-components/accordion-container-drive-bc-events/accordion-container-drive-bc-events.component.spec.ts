import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionContainerDriveBcEventsComponent } from './accordion-container-drive-bc-events.component';

describe('AccordionContainerDriveBcEventsComponent', () => {
  let component: AccordionContainerDriveBcEventsComponent;
  let fixture: ComponentFixture<AccordionContainerDriveBcEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionContainerDriveBcEventsComponent]
    });
    fixture = TestBed.createComponent(AccordionContainerDriveBcEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
