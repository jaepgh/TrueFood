import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { take } from 'rxjs/operators';
import { OrderComplete } from 'shared/models/order-complete';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {
  order: OrderComplete;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {
  }

  ngOnInit(): void {
    const _id = this.route.snapshot.paramMap.get('id');

    if (_id) {
      this.orderService.getOrderById(_id).pipe(take(1))
        .subscribe(result => {
          this.order = new OrderComplete(result as OrderComplete);
        });
    }
  }

}
