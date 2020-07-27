import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';

import {AuthService} from './auth.service';
import {LoginDto} from '../models/login-dto';
import {AuthApiService} from '../core/auth-api.service';
import {AuthStateService} from '../core/auth-state.service';

class MockAuthApi {
  login(): Observable<LoginDto> {
    return from([{token: 'test'} as LoginDto]);
  }
}

class MockAuthState {
  set(): void {}

  setFailure(): void {}

  hasFailed$(): any {}

  isAuthenticated$(): any {}
}

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          {provide: Router, useValue: mockRouter},
          {provide: AuthApiService, useValue: new MockAuthApi()},
          {provide: AuthStateService, useValue: new MockAuthState()}
        ]
      }
    );
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully and navigate to dashboard', () => {
    service.login({email: '', password: ''});
    expect(mockRouter.navigate.calls.count()).toBeGreaterThanOrEqual(1);
    expect(mockRouter.navigate.calls.first().args[0][0]).toEqual('/dashboard');
  });
});
