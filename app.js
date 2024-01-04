const express = require("express")
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000
require("dotenv").config


// middlewares
app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// database connection 

const dbURI = "mongodb+srv://babyenzu:mebaby@cluster0.84cfun3.mongodb.net/"
mongoose.connect(dbURI)
.then(() => app.listen(PORT), console.log(`Connected to the database at port ${PORT}`))
.catch((error)=> console.log(error))


// test port
app.get('/', (req, res) => {
    res.send("This is me baby, I work")
})