import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart;
  subscription: Subscription;

  constructor(producService: ProductService, route: ActivatedRoute, private shopingCartService: ShopingCartService) {
    producService.getAllProducts().pipe(switchMap(
      products => {
        this.products = products as Product[];
        return route.queryParamMap;
      }
    )).subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.products.filter(product => product.category.toString() === this.category) : this.products;
    });
  }

  async ngOnInit() {
    this.subscription = await this.shopingCartService.getCart()
      .then(result => {
        return result.subscribe(obj => {
          return this.cart = obj;
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
