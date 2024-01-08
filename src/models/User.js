const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: true
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