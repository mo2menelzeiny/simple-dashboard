import {Injectable} from '@angular/core';

import {AuthApiService} from '../core/auth-api.service';
import {AuthStateService} from '../core/auth-state.service';
import {LoginForm} from '../models/login-form';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authApi: AuthApiService,
    private authState: AuthStateService,
    private router: Router
  ) { }

  login(form: LoginForm): void {
    this.authApi.login(form).subscribe(
      value => {
        this.authState.set(value.token);
        this.router.navigate(['/dashboard']);
      }, _ => {
        this.authState.setFailure(true);
      }
    );
  }

  hasFailed$(): Observable<boolean> {
    return this.authState.hasFailed$();
  }

  isAuthenticated$(): Observable<boolean> {
    return this.authState.isAuthenticated$();
  }
}
