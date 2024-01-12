const mongoose = require("mongoose")
const { isEmail } = require("validator")

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    }
});


const User = mongoose.model("user", UserSchema);

module.exports = {
    User
}