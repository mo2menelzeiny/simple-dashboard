import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CustomerApiService} from '../core/customer-api.service';
import {DashboardStateService} from '../core/dashboard-state.service';
import {Customer} from '../models/customer';
import {CustomerDto} from '../models/customer-dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private customerApi: CustomerApiService, private dashboardState: DashboardStateService) {
    this.loadCustomers().subscribe();
  }

  loadCustomers(): Observable<Customer[]> {
    return this.customerApi.loadCustomers()
      .pipe(
        map(dtos => {
          const customers = this.transformDto(dtos);
          this.dashboardState.setCustomers(customers);
          return customers;
        })
      );
  }

  getCustomers$(): Observable<Customer[]> {
    return this.dashboardState.getCustomers$();
  }

  transformDto(dtos: CustomerDto[]): Customer[] {
    return dtos.map(dto => {
      return {
        email: dto.email,
        firstName: dto.first_name,
        lastName: dto.last_name,
        avatar: dto.avatar,
        country: dto.country
      } as Customer;
    });
  }
}
