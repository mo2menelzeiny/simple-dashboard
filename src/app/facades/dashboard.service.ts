import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CustomerApiService} from '../core/customer-api.service';
import {DashboardStateService} from '../core/dashboard-state.service';
import {Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private customerApi: CustomerApiService, private dashboardState: DashboardStateService
  ) {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerApi.loadCustomers().pipe(
      map(customers =>
        customers.map(
          customer => {
            return {
              email: customer.email,
              firstName: customer.first_name,
              lastName: customer.last_name,
              avatar: customer.avatar,
              country: customer.country
            } as Customer;
          }
        )
      )
    ).subscribe(customer => this.dashboardState.setCustomers(customer));
  }

  getCustomers$(): Observable<Customer[]> {
    return this.dashboardState.getCustomers$();
  }
}
