import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Customer} from '../../models/customer';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Customer) {}

  ngOnInit(): void {
  }

}
