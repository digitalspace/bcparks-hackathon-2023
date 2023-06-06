import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionContainerWildfireComponent } from './accordion-container-wildfire.component';

describe('AccordionContainerWildfireComponent', () => {
  let component: AccordionContainerWildfireComponent;
  let fixture: ComponentFixture<AccordionContainerWildfireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionContainerWildfireComponent]
    });
    fixture = TestBed.createComponent(AccordionContainerWildfireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
