const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController")


//Auth routes
router.post('/login', authController.signup_post);

router.post('/signup', authController.login_post);

router.delete("/:userId", authController.delete_user);


module.exports = router;