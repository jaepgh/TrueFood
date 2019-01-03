import { ShoppingCart } from './shopping-cart';
import { formattedError } from '@angular/compiler';
import { forEach } from '@angular/router/src/utils/collection';

export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId, public customerName, public shipping: any, shoppinCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppinCart.items.map(item => {
            return {
                product: {
                    title: item.title,
                    imageUrl: item.imageUrl,
                    price: item.price
                },
                quantity: item.quantity,
                totalPrice: item.totalPrice
            };
        });
    }
}
