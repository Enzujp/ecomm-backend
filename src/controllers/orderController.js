const mongoose = require("mongoose");
const { Order } = require("../models/Order");
const { Product } = require("../models/Product");

module.exports.get_all_orders = async (req, res) => {
  try {
    const orders = await Order.find()
      .select("product quantity _id")
      .populate("product name")
      .exec();
    if (orders) {
      res.status(200).json({
        count: orders.length,
        orders: orders.map((order) => {
          return {
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
          };
        }),
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.create_new_order = async (req, res) => {
    try {
        // first check to see that product exists
        const { id, quantity, productId } = req.body;
        const product = await Product.findById({_id: id})
        if (!product) {
            res.status(400).json({
                error: error.message,
                message: "Could not find this product!"
            })
        } else {
            const order = new Order ({
                _id: new mongoose.Types.ObjectId,
                quantity: quantity,
                product: productId
            });
            return await order.save()
        }
        if (order) {
            res.status(201).json({
                message: "Order created successfully!",
                success: true
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.get_order_by_id = async (req, res) => {
    try {
        const id = req.params.orderId;
        const order = await Order.findById({_id: id})
        .populate("product")
        .exec()
        if (order) {
            res.status(200).json({
                order: order // expand on this
            })
        }
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports.delete_order = async (req, res) => {
  try {
    const id = req.params.orderId;
    const removedOrder = await Order.deleteOne({_id: id})
    .exec()
    if (removedOrder) {
      res.status(200).json({
        message: "Successfully deleted this order."
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}