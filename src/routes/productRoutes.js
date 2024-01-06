const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads'); // setting file destination to uploads folder
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname); // returns filename and date of creation
    }
})

// set fileFilter to determine what file time comes in
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpg' || file.mimetype === "image/png") {
        cb(null, true); // allow images of formats jpg or png only
    } else {
        cb(null, false)
    }
}

// upload criteria
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.get("/", productController.get_products)
router.get("/:productId", productController.get_product_by_id)
router.post("/", productController.create_product)
router.patch("/:productId", productController.update_product)
// router.delete("/products/:productId", productController.delete_product)


// rewrite routes in more optimized manner

module.exports = router;