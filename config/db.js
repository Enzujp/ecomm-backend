const mongoose = require("mongoose")
const PORT = process.env.PORT || 3000
require("dotenv").config()

const dbURI = process.env.DBURI
const db = mongoose.connect(dbURI)
.then(() => console.log(`Connected to the database at port ${PORT}`))
.catch((error)=> console.log(error))


module.exports = db;