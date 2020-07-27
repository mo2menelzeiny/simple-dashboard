import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LoginForm} from '../models/login-form';
import {LoginDto} from '../models/login-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  readonly API = 'https://reqres.in/api/login';

  constructor(private httpClient: HttpClient) {
  }

  login(form: LoginForm): Observable<LoginDto> {
    return this.httpClient.post<LoginDto>(this.API, form);
  }
}
