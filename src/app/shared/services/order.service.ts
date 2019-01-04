import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShopingCartService } from './shoping-cart.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppinCartService: ShopingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    await this.db.object('/orders/' + result.key).update({ key: result.key });
    this.shoppinCartService.emptyCart();
    return result;
  }

  getAllOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrderByUser(userUid) {
    return this.db.list('/orders',
      ref => ref.orderByChild('userId').equalTo(userUid)).valueChanges();
  }

  getOrderById(_id: string) {
    return this.db.object('/orders/' + _id).valueChanges();
  }
}
