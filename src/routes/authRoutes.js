const express = require("express");
const router = express.Router();

const authController = require("../controllers/adminController")
// create routes for login, signup

//Auth routes
router.post('/login', authController.signup_post);

router.post('/signup', authController.login_post);

module.exports = router;