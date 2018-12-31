import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from '../services/shoping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;

  constructor(private shoppingCartServices: ShopingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartServices.getCart();
  }

  emptyCart() {
    this.shoppingCartServices.emptyCart();
  }

}
