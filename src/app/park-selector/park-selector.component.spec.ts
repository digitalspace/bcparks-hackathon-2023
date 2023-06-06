import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkSelectorComponent } from './park-selector.component';

describe('ParkSelectorComponent', () => {
  let component: ParkSelectorComponent;
  let fixture: ComponentFixture<ParkSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkSelectorComponent]
    });
    fixture = TestBed.createComponent(ParkSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
