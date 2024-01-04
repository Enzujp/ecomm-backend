const mongoose = require("mongoose")
const PORT = process.env.PORT || 3000
const express = require("express")
const app = express(); // move the port to the app page to prevent repitition
require("dotenv").config()

const dbURI = process.env.DBURI
const db = mongoose.connect(dbURI)
.then(() => app.listen(PORT), console.log(`Connected to the database at port ${PORT}`))
.catch((error)=> console.log(error))


module.exports = db