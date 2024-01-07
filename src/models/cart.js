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
}