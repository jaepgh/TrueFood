import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId, public shipping: any, shoppinCart: ShoppingCart) {
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
