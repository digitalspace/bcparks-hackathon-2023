import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSectionComponent } from './checkbox-section.component';

describe('CheckboxSectionComponent', () => {
  let component: CheckboxSectionComponent;
  let fixture: ComponentFixture<CheckboxSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxSectionComponent]
    });
    fixture = TestBed.createComponent(CheckboxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
