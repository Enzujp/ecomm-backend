const express = require("express")
const app = express();
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // helps handle sessions
const connectDB  = require("./config/db");


// routes
const adminRoutes = require("./src/routes/adminRoutes");
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");
const orderRoutes = require("./src/routes/orderRoutes");


// port
const PORT = process.env.PORT || 3000

// necessary configs
require("dotenv").config;
require("./config/queue");
connectDB();


// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DBURI
        }),
        // set session expiry using cookies
        cookie: { maxAge: 60 * 1000 * 60 * 3 },
    })
)

// global variables accross routes
app.use(async(req, res, next) => {
    try {
        res.locals.session = req.session;
        res.locals.currentUser = req.user;
    next();   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
        res.redirect("/") // this might give an error
    }
})



// routes to handle requests
app.use("/user", authRoutes);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes);
app.use("/order", orderRoutes);

// test port
app.get('/', (req, res) => {
    res.send("This is me baby, I work")
})


// start server

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`)
})