const mongoose = require("mongoose")
require("dotenv").config()

const dbURI = process.env.DBURI
const db = mongoose.connect(dbURI)
.then(() => app.listen(PORT), console.log(`Connected to the database at port ${PORT}`))
.catch((error)=> console.log(error))


module.exports = db