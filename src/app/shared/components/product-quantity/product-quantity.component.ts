import { Component, OnInit, Input } from '@angular/core';
import { ShopingCartService } from 'shared/services/shoping-cart.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input() product: Product;
  @Input() shoppingCart;
  constructor(private cartService: ShopingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
