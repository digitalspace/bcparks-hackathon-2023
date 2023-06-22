import { TestBed } from '@angular/core/testing';

import { DriveBCService } from './drivebc.service';

describe('DriveBCService', () => {
  let service: DriveBCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriveBCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
