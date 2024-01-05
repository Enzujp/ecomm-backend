const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {User} = require("../models/User");
require("dotenv").config()

module.exports.signup_post = async (req, res,) => {
  try {
    const {username, password} = req.body
    const user = await User.findOne({ username: username })
    if (user) {
      res.status(409).json({
        message: "Username already exists!"
      })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: hashedPassword
      })
      await user.save();
      res.status(201).json({
        message: "User created successfully",
        user: user._id
      })
    } 
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
};


module.exports.login_post = (req, res) => {
    User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, result)=> {
          if (err) {
            return res.status(401).json({
              message: "Incorrect Password!"
            })
          }
          if (result) {
            const token = jwt.sign({username: user.username, userId: user._id}, process.env.SECRET_KEY, {expiresIn: "1h"})
          }
        });
        return res.status(200).json({
          message: "Authentication successful", 
          token: token
        })
      }
      res.status(401).json({
        message: "Authentication failed"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err.message
      })
    })
}

