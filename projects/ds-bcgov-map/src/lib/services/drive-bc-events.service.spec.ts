import { TestBed } from '@angular/core/testing';

import { DriveBCEventsService } from './drive-bc-events.service';

describe('DriveBCEventsService', () => {
  let service: DriveBCEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriveBCEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
