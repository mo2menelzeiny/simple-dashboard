import {TestBed} from '@angular/core/testing';

import {AuthApiService} from './auth-api.service';
import {HttpClientModule} from '@angular/common/http';

describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
