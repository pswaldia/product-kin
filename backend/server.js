const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./passportConfig");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs");

initializePassport(passport);

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
const userRouter = require("./routes/user.js");
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
