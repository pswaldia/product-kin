const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");
const session = require("express-session");
const passport = require("passport");
var cors = require('cors');
const initializePassport = require("./passportConfig");
const jwt = require("jsonwebtoken"); //token
const path = require("path");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

require("dotenv").config();
//npm - jwt, nodemailer, jsonwebtoken
//start-aniket
let user={};

var nodemailer = require('nodemailer'); //mails
//end aniket
const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs");
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

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
const answerRouter = require("./routes/answer_page.js")
const challengeRouter = require("./routes/challenge.js")
app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);
app.use("/challenge",challengeRouter);

if ( process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "frontend/build")));
}

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
