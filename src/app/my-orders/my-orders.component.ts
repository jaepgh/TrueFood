import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthorizationService } from '../services/authorization.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  displayedColumns: string[];

  constructor(private orderService: OrderService, private authService: AuthorizationService) {
    this.authService.user$.pipe(take(1)).subscribe(user => this.orders$ = this.orderService.getOrderByUser(user.uid));
    this.displayedColumns = ['customer', 'date', 'view'];
  }

  ngOnInit() {

  }

}
