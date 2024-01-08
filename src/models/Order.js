const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
    cart: {
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
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                qty: {
                    type: Number,
                    default: 0
                },
                price: {
                    type: Number,
                    default: 0
                },
                name: {
                    type: String,
                },
                productCode: {
                    type: String
                }
            }
        ]
    },
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}) // link model to Product



const Order = mongoose.model("order", OrderSchema);

module.exports = { Order }