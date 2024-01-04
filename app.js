const express = require("express")
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
// const PORT = process.env.PORT || 3000

// necessary configs
require("dotenv").config;
require("./config/db");

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// database connection 



// routes to use
app.use("/user", authRoutes)

// test port
app.get('/', (req, res) => {
    res.send("This is me baby, I work")
})
