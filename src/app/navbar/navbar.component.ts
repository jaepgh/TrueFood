import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { AppUser } from '../models/app.user';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthorizationService, private shoppingCartService: ShopingCartService) {
  }

  signOut() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart().then(result => result);
  }
}
