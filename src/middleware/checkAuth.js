const jwt = require("jsonwebtoken");
const {User} = require("../models/User");
require("dotenv").config();

const checkAuth = (req, res, next) => {
    try {
        // get token from header
        const token = req.header('Authorization')
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        
        const user = decoded.user;
        if (req.user === user){
            next();
        }
        else {
            return res.status(401).json({
                message: "Invalid user and token credentials"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Authentication failed"
        })
    }
}

module.exports = checkAuth;