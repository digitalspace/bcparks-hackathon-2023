import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkInfoComponent } from './park-info.component';

describe('ParkInfoComponent', () => {
  let component: ParkInfoComponent;
  let fixture: ComponentFixture<ParkInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkInfoComponent]
    });
    fixture = TestBed.createComponent(ParkInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
