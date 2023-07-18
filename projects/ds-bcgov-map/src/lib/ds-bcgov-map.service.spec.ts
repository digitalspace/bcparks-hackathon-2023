import { TestBed } from '@angular/core/testing';

import { DsBcgovMapService } from './ds-bcgov-map.service';

describe('DsBcgovMapService', () => {
  let service: DsBcgovMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsBcgovMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
