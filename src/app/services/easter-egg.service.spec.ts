import { TestBed } from '@angular/core/testing';

import { EasterEggService } from './easter-egg.service';

describe('EasterEggService', () => {
  let service: EasterEggService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasterEggService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
