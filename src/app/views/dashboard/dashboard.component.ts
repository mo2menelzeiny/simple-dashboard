import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';

import {Customer} from '../../models/customer';
import {DashboardService} from '../../facades/dashboard.service';
import {DashboardItemComponent} from './dashboard-item.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) matSort: MatSort;
  dataSource: MatTableDataSource<Customer>;
  subscription: Subscription;

  constructor(public dashboard: DashboardService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.dashboard.getCustomers$().pipe(
      map(customer => {
        this.dataSource = new MatTableDataSource<Customer>(customer);
        this.dataSource.sort = this.matSort;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickRow(row: Customer, $event: any): void {
    this.matDialog.open(DashboardItemComponent, {data: row, minWidth: 400});
  }
}
