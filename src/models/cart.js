const mongoose = require("mongoose")

const CartSchema = new mongoose.schema({
    items : [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            qty: {
                type: Number
            },
            price: {
                type: Number,
                default: 0
            },
            name: {
                type: String
            },
            productCode: {
                type: String
            },
            totalqty: {
                type: Number,
                default: 0,
                required: true
            },
            totalCost: {
                type: Number,
                default: 0,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: false,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        },
        
    ]
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart }