const  {Admin} = require("../models/Admin");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createToken } = require("../../config/token");

module.exports.admin_signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminUser = await Admin.findOne({
      username: username,
    });
    if (adminUser) {
      res.status(409).json({
        success: false,
        message: "This admin user already exists",
      });
    } else {
      // generate hash
      const hashedPassword = bcrypt.hash(password, 10);
      const admin = new Admin({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: hashedPassword,
      });
      await admin.save();
      res.status(201).json({
        message: "Administratice User created successfully",
        adminUser: admin,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.admin_login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username });
    if (admin) {
      // create token after verifying password
      const auth = await bcrypt.compare(password, admin.password);
      if (auth) {
        const token = createToken(admin._id);
        res.status(200).json({
          message: "Admin logged in successfully",
          admin: admin,
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(404).json({
        message: "User doesnt exist, try to signup instead",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// delete admin

module.exports.delete_admin = async (req, res) => {
  try {
    const id = req.params.adminId;
    const admin = await Admin.remove({_id: id})
    .exec()
    if (admin) {
        res.status(200).json({
            message: "Admin successfully removed"
        })
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
        error: error.message
    });
  }
};
