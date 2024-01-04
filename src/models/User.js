const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    }
})

mongoose.exports = mongoose.model("User", userSchema);