import {TestBed} from '@angular/core/testing';
import {Router, UrlTree} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {from, Observable} from 'rxjs';

import {AuthGuard} from './auth-guard.service';
import {AuthService} from '../facades/auth.service';

class MockAuthService {
  state: boolean[];

  constructor(state: boolean[]) {
    this.state = state;
  }

  isAuthenticated$(): Observable<boolean> {
    return from(this.state);
  }
}

class MockRouter {
  parseUrl(): UrlTree {
    return new UrlTree();
  }
}

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: Router, useValue: new MockRouter()}
      ]
    });
  });

  it('should be created', () => {
    TestBed.overrideProvider(AuthService, {useValue: new MockAuthService([true])});
    const guard = TestBed.inject(AuthGuard);
    expect(guard).toBeTruthy();
  });

  const routeMock: any = {snapshot: {}};
  const routeStateMock: any = {snapshot: {}, url: '/login}'};

  it('should return true when authorised', () => {
    TestBed.overrideProvider(AuthService, {useValue: new MockAuthService([true])});
    const guard = TestBed.inject(AuthGuard);
    const canActivate$ = guard.canActivate(routeMock, routeStateMock);
    (canActivate$ as Observable<boolean | UrlTree>).subscribe((value) => expect(value).toEqual(true));
  });

  it('should return path when unauthorised', () => {
    TestBed.overrideProvider(AuthService, {useValue: new MockAuthService([false])});
    const guard = TestBed.inject(AuthGuard);
    const canActivate$ = guard.canActivate(routeMock, routeStateMock);
    (canActivate$ as Observable<boolean | UrlTree>).subscribe((value => expect(value).toBeInstanceOf(UrlTree)));
  });
});
