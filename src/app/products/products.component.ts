import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;

  constructor(producService: ProductService, route: ActivatedRoute) {
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

  ngOnInit() {
  }

}
