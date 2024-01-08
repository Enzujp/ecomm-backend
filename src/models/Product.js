const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productCode: {
        type: String,
        required: true, // maybe not true
        unique: true
    },
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true // check this too
    },
    productImage: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
        required: true

    }
})

const Product = mongoose.model("product", ProductSchema);

module.exports = {
    Product
}