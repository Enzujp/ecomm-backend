module.exports.cart = (oldCart) => {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = (item, id) => {
        this.storedItem = this.items[id];
        if (!this.storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0}
        }
        storedItem.qty ++;
        storedItem.price = storedItem.item.price * storedItem.qty
        this.totalQty++;
        this.totalPrice += storedItem.item.price
    }

    this.reduceByOne = (id) => {
        this.items[id].qty--;
        this.items.price[id] -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    }

    this.removeItem = (id) => {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    }

    this.generateArray = () => {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};