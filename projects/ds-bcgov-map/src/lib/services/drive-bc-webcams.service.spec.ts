import { TestBed } from '@angular/core/testing';

import { DriveBCWebcamsService } from './drive-bc-webcams.service';

describe('DriveBcWebcamService', () => {
  let service: DriveBCWebcamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriveBCWebcamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
