import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsBcgovMapComponent } from './ds-bcgov-map.component';

describe('DsBcgovMapComponent', () => {
  let component: DsBcgovMapComponent;
  let fixture: ComponentFixture<DsBcgovMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DsBcgovMapComponent]
    });
    fixture = TestBed.createComponent(DsBcgovMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
