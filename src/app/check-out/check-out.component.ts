import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopingCartService } from '../services/shoping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription, Observable } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthorizationService } from '../services/authorization.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  shipping = {};
  cartSubscription: Subscription;
  userUid: String;
  userSubscription: Subscription;

  constructor(private shoppingCartService: ShopingCartService, private orderService: OrderService,
    private authService: AuthorizationService, private router: Router) { }

  async ngOnInit() {
    let cart$: Observable<ShoppingCart>;
    await this.shoppingCartService.getCart().then(sub => cart$ = sub);
    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userUid = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userUid, this.shipping, this.cart);
    this.orderService.placeOrder(order)
      .then(result => this.router.navigate(['/order-success', result.key]));
  }
}
