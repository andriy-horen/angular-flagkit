import { TestBed } from '@angular/core/testing';

import { AngularFlagkitService } from './angular-flagkit.service';

describe('AngularFlagkitService', () => {
  let service: AngularFlagkitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularFlagkitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
