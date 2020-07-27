import {Component, OnInit, ViewChild} from '@angular/core';
import {map} from 'rxjs/operators';

import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import {DashboardService} from '../../facades/dashboard.service';
import {Customer} from '../../models/customer';
import {MatDialog} from '@angular/material/dialog';
import {DashboardItemComponent} from './dashboard-item.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSort) matSort: MatSort;
  source: MatTableDataSource<Customer>;

  constructor(public dashboard: DashboardService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.dashboard.getCustomers$().pipe(
      map((value => {
        this.source = new MatTableDataSource<Customer>(value);
        this.source.sort = this.matSort;
      }))
    ).subscribe();
  }

  onClickRow($event: any, row: Customer): void {
    this.matDialog.open(DashboardItemComponent, {data: row, minWidth: 400});
  }
}
