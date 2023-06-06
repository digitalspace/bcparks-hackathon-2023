import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayuseAccordionItemComponent } from './dayuse-accordion-item.component';

describe('DayuseAccordionItemComponent', () => {
  let component: DayuseAccordionItemComponent;
  let fixture: ComponentFixture<DayuseAccordionItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayuseAccordionItemComponent]
    });
    fixture = TestBed.createComponent(DayuseAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
