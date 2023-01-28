const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/db");
const mainRoutes = require("./routes/main");
const journalRoutes = require("./routes/Journal");
const profileRoutes = require("./routes/profiles");
// const postRoutes = require("./routes/posts");
// const commentRoutes = require('./routes/comments')

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
// app.set("view engine", "ejs");

//Static Folder
// app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: process.env.ORIGIN_URL, //Location of the react application
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true, //Allows session cookies to pass through
  })
);
//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // cookie: {secure: true}
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/profile", profileRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on PORT ${process.env.PORT}, you better catch it!`
  );
});
