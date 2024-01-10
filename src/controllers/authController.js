const { User } = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { emailQueue } = require("../../config/queue")

const { createToken } = require("../../config/token");
require("dotenv").config()


// signup user
module.exports.signup_post = async (req, res,) => {
  try {
    const {username, email, password} = req.body
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
        email: email,
        password: hashedPassword
      })
      // create user token
      const token = createToken(user._id)
      await user.save();
      res.status(201).json({
        message: "User created successfully",
        user: user._id, 
        token: token
      })

      // Send mail on signup
      const link = process.env.NODE_ENV === 'production' ? '' : "http://localhost:3000";
      const emailToken = createToken(email);
      const html = `<h4>Please help verify this email<h4><p>${link}/auth/email/verify/${emailToken}<p>`
      emailQueue.add({email, html})
    } 
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }

};


//login user
module.exports.login_post = async (req, res) => {
    try {
      const {username, password} = req.body;
      // confirm user's existence in database
      const user = await User.findOne({ username: username })
      if (!user) {
        res.status(404).json({
          message: "Error, This User doesnt exist!"
        })
      } else {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
          const token = createToken(user._id)
          res.status(200).json({
            success: true,
            message: "User successfully logged in",
            _token: token
          })
        }
        else {
          res.status(409).json({
            success: false,
            message: "Wrong Password"
          })
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: error.message
      })
    }
}

module.exports.delete_user = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await User.deleteOne({ _id: id })
    .exec()
    if (user) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error.message
    })
  }
}

// Add email verification, password reset and password forget controllers
