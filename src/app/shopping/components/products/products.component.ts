import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShopingCartService } from 'shared/services/shoping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private producService: ProductService, private route: ActivatedRoute, private shopingCartService: ShopingCartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.shopingCartService.getCart()
      .then(result => result);
    this.populateProducts();

  }

  private applFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(product => product.category.toString() === this.category) :
      this.products;
  }

  private populateProducts() {
    this.producService.getAllProducts().pipe(switchMap(
      products => {
        this.products = products as Product[];
        return this.route.queryParamMap;
      }
    )).subscribe(params => {
      this.category = params.get('category');
      this.applFilter();
    });
  }
}
