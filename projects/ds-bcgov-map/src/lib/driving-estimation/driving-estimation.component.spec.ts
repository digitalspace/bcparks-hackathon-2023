import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingEstimationComponent } from './driving-estimation.component';

describe('DrivingEstimationComponent', () => {
  let component: DrivingEstimationComponent;
  let fixture: ComponentFixture<DrivingEstimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrivingEstimationComponent],
    });
    fixture = TestBed.createComponent(DrivingEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
