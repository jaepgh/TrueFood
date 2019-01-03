import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Order } from '../models/order';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit, OnDestroy {

  @Input() displayedColumns: string[];
  @Input() orders$: Observable<any>;
  subscription: Subscription;
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    if (this.orders$) {
      this.subscription = this.orders$.
        subscribe(orders => {
          this.dataSource = new MatTableDataSource(orders as Order[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
