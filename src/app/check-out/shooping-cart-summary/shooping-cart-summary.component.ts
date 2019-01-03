import { Component, Input, } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-shooping-cart-summary',
  templateUrl: './shooping-cart-summary.component.html',
  styleUrls: ['./shooping-cart-summary.component.css']
})
export class ShoopingCartSummaryComponent {
  @Input() cart: ShoppingCart;
  constructor() { }

}
