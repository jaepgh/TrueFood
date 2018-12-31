import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';


export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [key: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for (const key in itemsMap) {
            if (itemsMap.hasOwnProperty(key)) {
                const item = itemsMap[key];
                this.items.push(new ShoppingCartItem({
                    ...item, key: key
                }));
            }
        }
    }


    getCartQuantity(product: Product) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    get shoppingCartItemsCount() {
        let total = 0;

        for (const key in this.itemsMap) {
            if (this.itemsMap.hasOwnProperty(key)) {
                total += this.itemsMap[key].quantity;
            }
        }
        return total;
    }

    get totalCartValue() {
        let total = 0;

        for (const key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                total += this.items[key].totalPrice;
            }
        }
        return total;
    }

}
