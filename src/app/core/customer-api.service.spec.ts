import {TestBed} from '@angular/core/testing';

import {CustomerApiService} from './customer-api.service';

describe('DashboardApiService', () => {
  let service: CustomerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
