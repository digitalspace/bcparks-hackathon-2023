import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionContainerDriveBcWebcamComponent } from './accordion-container-drive-bc-webcam.component';

describe('AccordionContainerDriveBcWebcamComponent', () => {
  let component: AccordionContainerDriveBcWebcamComponent;
  let fixture: ComponentFixture<AccordionContainerDriveBcWebcamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionContainerDriveBcWebcamComponent]
    });
    fixture = TestBed.createComponent(AccordionContainerDriveBcWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
