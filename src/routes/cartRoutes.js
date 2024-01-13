const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

// for csrf 
// could use xss for csrf

router.get("/add-to-cart/:cartId", checkAuth, cartController.get_add_to_cart);
router.get("/shopping-cart", checkAuth, cartController.get_shopping_cart);
router.get("/reduce/:cartId", checkAuth, cartController.get_reduce_cart_qty );
router.get("/remove-all/:cartId", checkAuth, cartController.get_remove_all);
router.post("/checkout", checkAuth, cartController.checkout_post);


module.exports = router;