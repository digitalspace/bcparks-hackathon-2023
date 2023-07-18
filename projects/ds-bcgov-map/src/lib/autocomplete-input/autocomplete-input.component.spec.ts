import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteInputComponent } from './autocomplete-input.component';

describe('AutocompleteInputComponent', () => {
  let component: AutocompleteInputComponent;
  let fixture: ComponentFixture<AutocompleteInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteInputComponent]
    });
    fixture = TestBed.createComponent(AutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
