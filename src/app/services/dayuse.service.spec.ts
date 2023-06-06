import { TestBed } from '@angular/core/testing';

import { DayuseService } from './dayuse.service';

describe('DayuseService', () => {
  let service: DayuseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayuseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
