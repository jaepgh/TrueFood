export class OrderComplete {
    datePlaced: number;
    items: any[];
    shipping;
    costumerName;

    constructor(order) {
        this.datePlaced = order.datePlaced;
        this.items = order.items;
        this.shipping = order.shipping;
        this.costumerName = order.costumerName;
    }

    get totalOrderValue() {
        let total = 0;

        this.items.forEach(element => {
            total += element.totalPrice;
        });

        return total;
    }

    get totalOrderItems() {
        let total = 0;

        this.items.forEach(element => {
            total += element.quantity;
        });

        return total;
    }
}
