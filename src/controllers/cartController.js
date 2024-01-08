const { Cart } = require("../models/cart");
const { Product } = require("../models/Product");
const { Order } = require("../models/Order");
const checkAuth = require("../middleware/checkAuth");

module.exports.get_add_to_cart = async(req, res) => {
    const productId = req.params.id;
    try {
        let user_cart;
        if (req.user) {
            user_cart = await Cart.findOne({user: req.user._id});
        }
        let cart;
        if (
            (req.user && !user_cart && req.session.cart) ||
            (!req.user && req.session.cart)
        ) {
            cart = await new Cart(req.session.cart);
        } else if (!req.user || !user_cart) {
            cart = new Cart({});
        } else {
            cart = user_cart;
        }

        // adding product to cart
        // findIndex returns index position
        const product = await Product.findById(productId);
        const itemIndex = cart.items.findIndex((p) => p.productId == productId);
        if (itemIndex > 0) {
            // findIndex returns -1 if the cart or array is empty
            // if products exist in cart, update quantity
            cart.items[itemIndex].qty++;
            cart.items[itemIndex].price = cart.items[itemIndex].qty * product.price;
            cart.totalQty++;
            cart.totalCost += product.price;
        } else {
            cart.items.push({
                productId: productId,
                qty: 1,
                price: product.price,
                name:product.name,
                productCode: product.productCode,
            });
            cart.totalQty++;
            cart.totalCost = product.price;
        }

        // check to see that user is logged in and save cart history
        if (req.user) {
            cart.user = req.user._id;
            await cart.save();
        } 
        req.session.cart = cart; // save cart session
        res.status(200).json({
            message: "Added item to shopping cart"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.nessage
        })
    }
}