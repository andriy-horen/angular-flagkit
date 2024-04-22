import { TestBed } from '@angular/core/testing';

import { Iso3166Service } from './iso3166.service';

describe('Iso3166Service', () => {
  let service: Iso3166Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Iso3166Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
