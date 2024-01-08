const jwt = require("jsonwebtoken");
const {User} = require("../models/User")
require("dotenv").config();

const checkAuth = (req, res, next) => {
    try {
        // get token from header
        const token = req.header('Authorization')
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Authentication failed"
        })
    }
}

module.exports = checkAuth;