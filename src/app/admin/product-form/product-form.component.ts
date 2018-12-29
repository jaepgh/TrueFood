import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product = {};
  _id;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
    this.categories$ = categoryService.getAllCategories();

    this._id = this.route.snapshot.paramMap.get('id');
    if (this._id) {
      this.productService.getProduct(this._id).valueChanges().
        pipe(take(1))
        .subscribe(p => this.product = p);
    }
  }

  save(product) {
    if (this._id) {
      this.productService.updateProduct(this._id, product);
    } else {
      this.productService.createProduct(product);
    }
    this.router.navigateByUrl('/admin/products');
  }
  delete() {
    if (confirm('Product will be deleted, do you want to proceed?')) {
      this.productService.deleteProduct(this._id);
      this.router.navigateByUrl('/admin/products');
    }
  }
}
