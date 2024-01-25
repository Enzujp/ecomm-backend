const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController");
const { checkAuth } = require("../middleware/checkAuth");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads'); // setting file destination to uploads folder
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname); 
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === "image/png") {
        cb(null, true); // allow images of formats jpg or png only
    } else {
        cb(null, false)
    }
}


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


router.get("/", productController.get_products)
router.get("/:productId", productController.get_product_by_id)
router.post("/", checkAuth, productController.create_product)
router.patch("/:productId", checkAuth, productController.update_product)
// router.delete("/products/:productId", productController.delete_product)


// rewrite routes in more optimized manner

module.exports = router;