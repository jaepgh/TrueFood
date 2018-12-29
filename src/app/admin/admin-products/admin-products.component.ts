import { Component, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  productsList: any[];
  filteredProductsList: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = productService.getAllProducts().subscribe(products => this.filteredProductsList = this.productsList = products);
  }

  search(query) {
    this.filteredProductsList = (query) ?
      this.productsList.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.productsList;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
