import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from '../models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartUid = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartUid)
      .valueChanges().pipe(map(shopCart => {
        // @ts-ignore
        return new ShoppingCart(shopCart.items);
      }));
  }

  async emptyCart() {
    const cartUid = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartUid + '/items/').remove();
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartUid = localStorage.getItem('cartUid');
    if (!cartUid) {
      const result = await this.createCart();
      localStorage.setItem('cartUid', result.key);
      return result.key;
    }
    return cartUid;

  }

  private getCartItem(cartUid: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartUid + '/items/' + productId);
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartUid = await this.getOrCreateCartId();
    const items$ = this.getCartItem(cartUid, product.key);

    items$.valueChanges().pipe(take(1)).subscribe(item => {
      // @ts-ignore
      const quantity = item ? ((item.quantity) + change) : 1;
      if (quantity === 0) {
        items$.remove();
      } else {
        items$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    });
  }
}
