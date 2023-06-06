import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBoundaryToggleComponent } from './show-boundary-toggle.component';

describe('ShowBoundaryToggleComponent', () => {
  let component: ShowBoundaryToggleComponent;
  let fixture: ComponentFixture<ShowBoundaryToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowBoundaryToggleComponent]
    });
    fixture = TestBed.createComponent(ShowBoundaryToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
