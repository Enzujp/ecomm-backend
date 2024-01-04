const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports.signup_post = async (req, res) => {
  try {
    const oldUser = await User.Find({ username: req.body.username });
    if (oldUser > 1) {
      return res.status(409).json({
        message: "Username taken, please user another",
      });
    } else {
      const hashedPassword = bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hashedPassword,
          });
          user.save();
          res.status(201).json({
            message: "User created successfully",
            user: user,
          });
        }
      });
    }
  } catch (error) {
    error: error.message;
  }
};

module.exports.signup_get = (req, res) => {
    res.send("HIIIII")
}

module.exports.login_get = (req, res) => {
    res.send("Hold")
}

module.exports.login_post = (req, res) => {
    res.send("Hold")
}