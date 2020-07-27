import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
  private customers$ = new BehaviorSubject<Customer[]>(null);

  constructor() { }

  setCustomers(customers: Customer[]): void {
    this.customers$.next(customers);
  }

  getCustomers$(): Observable<Customer[]> {
    return this.customers$.asObservable();
  }
}
