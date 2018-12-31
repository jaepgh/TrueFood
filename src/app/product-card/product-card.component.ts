import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShopingCartService } from '../services/shoping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart;
  constructor(private cartService: ShopingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
