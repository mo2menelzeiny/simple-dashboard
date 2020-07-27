import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {CustomerApiService} from './customer-api.service';
import {CustomerDto} from '../models/customer-dto';

describe('DashboardApiService', () => {
  let service: CustomerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CustomerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET and fetch customers', () => {
    const customers: CustomerDto[] = [
      {id: 1, first_name: 'test', last_name: 'test', email: 'test@test.com', country: 'test', avatar: 'test'}
    ];
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.loadCustomers().subscribe((expected) => expect(customers).toEqual(expected));
    const mockRequest = httpTestingController.expectOne(service.API);
    expect(mockRequest.request.method).toBe('GET');
    mockRequest.flush(customers);
    httpTestingController.verify();
  });
});
