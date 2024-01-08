const { Cart } = require("../models/cart");
const { Product } = require("../models/Product");
const { Order } = require("../models/Order");


module.exports.get_add_to_cart = async(req, res) => {
    const productId = req.params.id;
    try {
        let userCart;
        if (req.user) {
            userCart = await Cart.findOne({user: req.user._id});
        }
        let cart;
        if (
            (req.user && !userCart && req.session.cart) ||
            (!req.user && req.session.cart)
        ) {
            cart = await new Cart(req.session.cart);
        } else if (!req.user || !userCart) {
            cart = new Cart({});
        } else {
            cart = userCart;
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

module.exports.get_shopping_cart = async (req, res) => {
    try {
        // find user's cart 
        let cartUser;
        if (req.user) {
            cartUser = await Cart.findOne({user: req.user._id});
        }
        //load user's cart if signed in
        if (req.user && cartUser) {
            req.session.cart = cartUser
            res.status(200).json({
                message: "Here's your cart",
                cart: cartUser,
                products: await productsFromCart(req.session.cart)
            });
        }
        // check for active cart in session and if user is not logged in, empty cart
        if (!req.session.cart) {
            res.json({
                cart: null,
                products: null,
                message: "There are no items in your cart"
            })

        // else, load session's cart
        return res.json({
            cart: req.session.cart,
            products: productsFromCart(req.session.cart)
        });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}


// reduce one item from the cart
module.exports.get_reduce_cart_qty = async (req, res) => {
    const productId = req.params.id;
    let cart;
    try {
        if (req.user) {
            cart = await Cart.findOne({user: req.user._id});
        } else if(req.seesion.cart) {
            cart = await new Cart(req.session.cart);
        }

    // find item with productId obtained from params
    const product = await Product.findById(productId);
    // reduce quantity if found
    if (product) {
        cart.items[itemIndex].qty--;
        cart.items[itemIndex].price -= product.price;
        cart.totalqty--;
        cart.totalCost -= product.price;
        // if quantity reaches zero, remove from cart
        if (cart.items[itemIndex].qty <= 0) {
            await cart.items.deleteOne({ _id: cart.items[itemIndex]._id });
        }
        req.session.cart = cart;
        // save cart if user is logged in
        if (req.user) {
            await cart.save();
        }

        // delete cart if qty is zero
        if (cart.totalQty <= 0) {
            req.session.cart = null;
            await Cart.findbyIdAndDelete(cart._id)
        }
        res.status(200).json({
            success: true
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports.get_remove_all = async (req, res) => {
    const productId = req.params.id;
    let cart;
    try {
        // check to see if user is logged in
        if (req.user) {
            cart = await Cart.findOne({user: req.user._id});
        } else if(req.session.cart) {
            cart = await new Cart(req.session.cart);
        }
        // find Item with productId
        const itemIndex = cart.items.findIndex((p) => p.productId == productId);
        if (itemIndex > -1) {
            // find product and then product price
            cart.totalQty -= cart.items[itemIndex].qty;
            cart.totalCost -= cart.items[itemIndex].price;
            await cart.items.deleteOne({ _id: cart.items[itemIndex]._id });
        }
        req.seesion.cart = cart;
        // save cart if user is logged in
        if (req.user) {
            await cart.save();
        }
        // delete cart if qty is 0
        if (cart.totalQty <= 0) {
            req.session.cart = null;
            await Cart.findbyIdAndDelete(cart._id);
        }
        res.status(200).json({
            message: "Remove from cart."
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


async function productsFromCart(cart) {
    let products = [];
    for (const item of cart.item) {
        const foundProduct = (await Product.findById(item.productId)).toObject();
        foundProduct["qty"] = item.qty;
        foundProduct["totalPrice"] = item.price;
        products.push(foundProduct);
    }
    return products;
}


module.exports = router;