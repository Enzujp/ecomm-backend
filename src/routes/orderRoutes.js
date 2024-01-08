const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const orderController = require("../controllers/orderController");

router.get("/", checkAuth, orderController.get_all_orders);
router.post("/", checkAuth, orderController.create_new_order);
router.get("/:orderId", checkAuth, orderController.get_order_by_id);
router.delete("/:orderId", checkAuth, orderController.delete_order);

module.exports = router;