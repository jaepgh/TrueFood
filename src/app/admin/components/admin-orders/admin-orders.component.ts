import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;
  displayedColumns: string[];

  constructor(private orderService: OrderService, private authService: AuthorizationService) {
    this.authService.user$.pipe(take(1)).subscribe(user => this.orders$ = this.orderService.getAllOrders());
    this.displayedColumns = ['customer', 'date', 'view'];
  }

  ngOnInit() {
  }

}
