import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {};
  userUid: String;
  userName: String;
  userSubscription: Subscription;
  @Input() cart: ShoppingCart;

  constructor(private orderService: OrderService,
    private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$
      .subscribe(user => {
        this.userUid = user.uid;
        this.userName = user.displayName;
      });
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userUid, this.userName, this.shipping, this.cart);
    this.orderService.placeOrder(order)
      .then(result => this.router.navigate(['/order-success', result.key]));
  }

}
