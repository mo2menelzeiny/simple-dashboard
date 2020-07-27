import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LoginForm} from '../models/login-form';
import {LoginDao} from '../models/loginDao';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  readonly API = '/api/login';

  constructor(private httpClient: HttpClient) {
  }

  login(form: LoginForm): Observable<LoginDao> {
    return this.httpClient.post<LoginDao>(this.API, form);
  }
}
