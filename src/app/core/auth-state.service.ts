import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private token$ = new BehaviorSubject<string>(null);
  private authenticated$ = new BehaviorSubject<boolean>(false);
  private failed$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  set(token: string): void {
    localStorage.setItem('token', token);
    this.token$.next(token);
    this.authenticated$.next(true);
    this.failed$.next(false);
    this.loading$.next(false);
  }

  isAuthenticated$(): Observable<boolean> {
    const isCached = localStorage.getItem('token') !== null;
    this.authenticated$.next(isCached);
    return this.authenticated$.asObservable();
  }

  setFailure(state: boolean): void {
    this.failed$.next(state);
    this.loading$.next(false);
  }

  hasFailed$(): Observable<boolean> {
    return this.failed$.asObservable();
  }
}
