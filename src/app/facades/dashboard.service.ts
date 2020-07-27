import {Injectable} from '@angular/core';

import {AuthApiService} from '../core/auth-api.service';
import {AuthStateService} from '../core/auth-state.service';
import {LoginForm} from '../models/login-form';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CustomerApiService} from '../core/customer-api.service';
import {DashboardStateService} from '../core/dashboard-state.service';
import {map} from 'rxjs/operators';
import {Customer} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private customerApi: CustomerApiService,
    private dashboardState: DashboardStateService
  ) {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerApi.loadCustomers().pipe(
      map(cDto =>
        cDto.map(
          (c => {
            return {
              email: c.email,
              firstName: c.first_name,
              lastName: c.last_name,
              avatar: c.avatar,
              country: c.country
            } as Customer;
          })
        )
      )
    ).subscribe(customer => this.dashboardState.setCustomers(customer));
  }

  getCustomers$(): Observable<Customer[]> {
    return this.dashboardState.getCustomers$();
  }
}
