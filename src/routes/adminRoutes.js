const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const productController = require("../controllers/productController");
const checkAdmin = require("../middleware/checkAdmin");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date.now().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true)
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

router.post("/register", adminController.admin_signup);
router.post("/login", adminController.admin_login);

// for admin dashboard routes

const dashboardRoutes = express.Router();

router.use("/dashboard", dashboardRoutes);

// for admin

dashboardRoutes.post("/addProduct", checkAdmin, upload.single('productImage'), productController.create_product);
dashboardRoutes.patch("/:productId", checkAdmin, productController.update_product);
dashboardRoutes.delete("/:productId", checkAdmin, productController.delete_product);
dashboardRoutes.delete("/:adminId", checkAdmin, adminController.delete_admin);

module.exports = router;