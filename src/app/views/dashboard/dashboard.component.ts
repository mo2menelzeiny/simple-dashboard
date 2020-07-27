import {Component, OnInit, ViewChild} from '@angular/core';
import {map} from 'rxjs/operators';

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
export class DashboardComponent implements OnInit {
  @ViewChild(MatSort) matSort: MatSort;
  dataSource: MatTableDataSource<Customer>;

  constructor(public dashboard: DashboardService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.dashboard.getCustomers$().pipe(
      map((customer => {
        this.dataSource = new MatTableDataSource<Customer>(customer);
        this.dataSource.sort = this.matSort;
      }))
    ).subscribe();
  }

  onClickRow(row: Customer, $event: any): void {
    this.matDialog.open(DashboardItemComponent, {data: row, minWidth: 400});
  }
}
