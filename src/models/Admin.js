const mongoose = require("mongoose");

// const itemIdSchema = new mongoose.Schema({
//     key: String,
// },
// {suppressWarning: true});

const AdminSchema = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [3, "please enter a password longer than 3 characters"]

    },
    role: {
        type: String,
        enum: ['Client', 'Manager', 'Admin'],
        default: 'Admin'
    }
})


const Admin = mongoose.model('admin', AdminSchema)

module.exports = {Admin}