import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  createProduct(product) {
    const ref = this.db.list('/products').push(product);
    const key = ref.key;
    ref.update({ key: key });
    return ref;
  }

  getAllProducts() {
    return this.db.list('/products').valueChanges();
  }

  getProduct(_id) {
    return this.db.object('/products/' + _id);
  }

  updateProduct(_id, newProduct) {
    return this.getProduct(_id).update(newProduct);
  }
  deleteProduct(_id) {
    return this.getProduct(_id).remove();
  }
}
