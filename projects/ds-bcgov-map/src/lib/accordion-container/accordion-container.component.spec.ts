import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionContainerComponent } from './accordion-container.component';

describe('AccordionContainerComponent', () => {
  let component: AccordionContainerComponent;
  let fixture: ComponentFixture<AccordionContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionContainerComponent]
    });
    fixture = TestBed.createComponent(AccordionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
