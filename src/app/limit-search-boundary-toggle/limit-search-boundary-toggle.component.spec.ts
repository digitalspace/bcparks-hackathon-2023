import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitSearchBoundaryToggleComponent } from './limit-search-boundary-toggle.component';

describe('LimitSearchBoundaryToggleComponent', () => {
  let component: LimitSearchBoundaryToggleComponent;
  let fixture: ComponentFixture<LimitSearchBoundaryToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LimitSearchBoundaryToggleComponent]
    });
    fixture = TestBed.createComponent(LimitSearchBoundaryToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
