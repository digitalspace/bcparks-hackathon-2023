import { TestBed } from '@angular/core/testing';

import { WildfireService } from './wildfire.service';

describe('WildfireService', () => {
  let service: WildfireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WildfireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
