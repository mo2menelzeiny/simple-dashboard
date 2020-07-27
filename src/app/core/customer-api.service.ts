import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {CustomerDto} from '../models/customer-dto';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  readonly API = 'https://api.mocki.io/v1/c8198306';

  constructor(private httpClient: HttpClient) {
  }

  loadCustomers(): Observable<CustomerDto[]> {
    return this.httpClient.get<CustomerDto[]>(this.API);
  }
}
