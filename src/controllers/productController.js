const mongoose = require("mongoose");
const { Product } = require("../models/Product");


// get all available products
module.exports.get_products = async (req, res) => {
  try {
    const products = await Product.find()
      .select("name price _id productImage")
      .exec();
    if (products) {
      const response = {
        count: products.length,
        products: products.map((product) => {
          return {
            name: product.name,
            price: product.price,
            _id: product._id,
            productImage: product.productImage,
            request: {
              type: "GET",
            },
          };
        }),
      };
      res.status(200).json({
        success: true,
        response: response,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};


// create new product
module.exports.create_product = async (req, res) => {
    try {
        const {name, price} = req.body
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            price: price,
            productImage: req.file.path
        });
        await product.save()
        res.status(200).json({
            message: "Product created Successfully",
            _id: product._id,
            name: product.name,
            price: product.price,
            productImage: product.productImage

        })
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                error: error.message
            }
        )
    }
}

// get product by ID
module.exports.get_product_by_id = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id)
        .select("name _id price productImage")
        .exec()
        if (product) {
            console.log("from database,", product);
            res.status(200).json({
                message: "Product Found and displayed below!",
                name: product.name,
                price: product.price,
                productImage: product.productImage,
                _id: product._id
            })
        }
        else {
            res.status(404).json({
                message: "Could not find any products matching that id"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}


// update product using product ID
module.exports.update_product = async (req, res) => {
    const id = req.params.productId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    const product = await Product.update({ id: id }, { $set: updateOps })
    .exec()
    if (product) {
        res.status(201).json({
            message: "Product updated successfully",
            name: product.name,
            price: product.price,
            _id: product._id,
            productImage: product.productImage
        })
    }
}

// delete product

module.exports.delete_product = async (req, res) => {
    try {
        const id = req.params.productId
        const product = await Product.removeAllListeners( {_id:id })
        .exec()
        if (product) {
            res.status(200).json({
                message: "Product deleted successfully",
                request: {
                    type: "POST",
                    body: {name: "String", price: "Number"}
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}