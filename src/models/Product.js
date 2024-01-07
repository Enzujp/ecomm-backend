const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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