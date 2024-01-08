const mongoose = require("mongoose")
const PORT = process.env.PORT || 3000
require("dotenv").config()

const connectDB = async () => {
    try {
        const dbURI = process.env.DBURI
        await mongoose.connect(dbURI)
        .catch((error)=> {
            console.log(error);
        })
        const connection = mongoose.connection;
        console.log(`Connected to the database at port ${PORT}`)
    } catch (error) {
        console(error)
        return error
    }
}

// const dbURI = process.env.DBURI
// const db = mongoose.connect(dbURI)
// .then(() => console.log(`Connected to the database at port ${PORT}`))
// .catch((error)=> console.log(error))
// const connection = mongoose.connection;


module.exports = connectDB;