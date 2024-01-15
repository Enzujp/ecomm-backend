const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers("Authorization")
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decoded;
        if (req.userData.role!= "Admin") {
            res.send(error);
        }
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized access!"
        })   
    }
}