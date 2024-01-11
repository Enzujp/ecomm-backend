const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController")


//Auth routes
router.post('/signup', authController.signup_post);

router.get('/email/verify/:token', authController.post_verify_email);

router.post('/login', authController.login_post);

router.delete("/:userId", authController.delete_user);


module.exports = router;