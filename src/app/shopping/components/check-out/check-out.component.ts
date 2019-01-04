import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from 'shared/services/shoping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShopingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();

  }

}
