import { TestBed } from '@angular/core/testing';

import { FlagsDataService } from './flags-data.service';

describe('FlagsDataService', () => {
  let service: FlagsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlagsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
