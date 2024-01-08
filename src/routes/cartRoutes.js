const express = require("express");
const router = express.Router();

router.get("/add-to-cart/:id", cartController.get_add_to_cart);
router.get("/shopping-cart", cartController.get_shopping_cart);
router.get("/reduce/:id", cartController.get_reduce_cart_qty );
router.get("/remove-all/:id", cartController.get_remove_all);
router.post("/checkout", cartController.checkout_post);


module.exports = router;