const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
})


const Admin = mongoose.models('admin', AdminSchema)

module.exports = {Admin}