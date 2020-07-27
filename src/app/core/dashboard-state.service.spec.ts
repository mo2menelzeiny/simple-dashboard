import {TestBed} from '@angular/core/testing';
import {take} from 'rxjs/operators';

import {DashboardStateService} from './dashboard-state.service';
import {Customer} from '../models/customer';

describe('DashboardStateService', () => {
  let service: DashboardStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should modify customer state', async () => {
    const customers: Customer[] = [
      {firstName: 'test', lastName: 'test', email: 'test@test.com', country: 'test', avatar: 'test'}
    ];
    service.setCustomers(customers);
    const expected = await service.getCustomers$().pipe(take(1)).toPromise();
    expect(expected).toEqual(customers);
  });
});
