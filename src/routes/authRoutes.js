const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController")
// create routes for login, signup

router.post("/login", authController.login_post);
router.post("/signup", authController.signup_post);
// router.delete("/:userId", chcekAuth, authController.delete_user);

module.exports = router;