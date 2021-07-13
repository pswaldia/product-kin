const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");
const session = require("express-session");
const passport = require("passport");
var cors = require('cors');
const initializePassport = require("./passportConfig");
require("dotenv").config();
const app = express();
app.use(passport.initialize());
app.use(passport.session());

const cookieParser = require('cookie-parser')
app.use(cookieParser());


const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '590421231063-fckjct9vmvbb417ijo4n9n5dkcctn7am.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

require("dotenv").config();
//npm - jwt, nodemailer, jsonwebtoken
//start-aniket
let user={};
const jwt= require('jsonwebtoken'); //token
var nodemailer = require('nodemailer'); //mails
//end aniket
const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs");
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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

app.get("/login",  (req, res) => {
  res.render("login");
});


//routes
const userRouter = require("./routes/user.js");
const questionRouter = require("./routes/question_page.js")
//const answerRouter = require("./routes/answer_page.js")
app.use(userRouter);
app.use(questionRouter);
//app.use(answerRouter);





app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
