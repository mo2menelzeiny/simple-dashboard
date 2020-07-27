import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {AuthApiService} from './auth-api.service';
import {LoginDto} from '../models/login-dto';
import {LoginForm} from '../models/login-form';

describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform POST and return user token', () => {
    const loginDto: LoginDto = {token: 'test'};
    const loginForm: LoginForm = {email: '', password: ''};
    const httpTestingController = TestBed.inject(HttpTestingController);
    service.login(loginForm).subscribe((expected) => expect(loginDto).toEqual(expected));
    const mockRequest = httpTestingController.expectOne(service.API);
    expect(mockRequest.request.method).toBe('POST');
    mockRequest.flush(loginDto);
    httpTestingController.verify();
  });

});
