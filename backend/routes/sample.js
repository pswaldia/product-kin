const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./passportConfig");


import {Stradegy} from passport-google-oauth
require("dotenv").config();
//npm - jwt, nodemailer, jsonwebtoken
//start-aniket
let user={};
const jwt= require('jsonwebtoken'); //token
var nodemailer = require('nodemailer'); //mails
//end aniket
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

app.get("/login",  (req, res) => {
  res.render("login");
});

app.post("/signup", async (req, res) => {
  try {
    let { name, email, password, notification } = req.body;
    let responseList = [];

    console.log({
      name,
      email,
      password,
      notification,
    });
    hashedPassword = await bcrypt.hash(password, 10);
    // checking if email already exists
    pool.query(
      `SELECT * FROM users
        WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        // console.log(results.rows);

        if (results.rows.length > 0) {
          responseList.push(
            { status: "false" },
            { message: "Email already registered" }
          );
          return res.send(responseList);
        } else {
          pool.query(
            `INSERT INTO users (name, email, password, notification)
                VALUES ($1, $2, $3, $4)`,
            [name, email, hashedPassword, notification],
            (err, results) => {
              if (err) {
                throw err;
              }
              responseList.push(
                { status: "true" },
                { message: "Registration Successfull" }
              );
              res.send(responseList);
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});


app.get("/dashboard",(req, res) => {
  console.log(req.user);
  res.render("dashboard");
});


app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) 
      return next(err); 
    if (!user) 
      return res.send([{status : "false"},info]); //login unsuccessful
    req.logIn(user, function(err) {
      if (err)
        return next(err); 
      return res.send([{status : "true"},info]); //authenticated successfully
    });
  })(req, res, next);
});

const JWT_SECRET = 'some super secret..'

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine','ejs')


app.get('/',(req,res)=>{
  res.send("Hello world")
})

// start aniket 2
app.get('/forgot-password',(req,res,next)=>{
  res.render('forgot-password')
})

app.post('/forgot-password',(req,res,next)=>{
  const {email}=req.body;
//fetching
pool.query(
  `SELECT * FROM users
    WHERE email = $1`,
  [email],
  (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
    if (results.rows.length == 1) {
      user=results.rows[0];
      console.log(user);
      const secret = JWT_SECRET + results.rows[0].password;
      const payload={
          email: results.rows[0].email,
          id: results.rows[0].user_id
      };
      const token = jwt.sign(payload,secret,{expiresIn:'15m'});
      console.log(results.rows[0].user_id);
      const link = 'http://localhost:4000/reset-password/'+results.rows[0].user_id+'/'+token;
      console.log(link)
      //send link 
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'minervaaniket@gmail.com',
          pass: "pbdmbm*6"
        }
      });
      
      var mailOptions = {
        from: 'minervaaniket@gmail.com',
        to: 'minervaaniket@gmail.com',
        subject: 'Reset Password Link',
        text: 'One time password Link, Click on the link to reset your password.\n'+link
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          let mes='Password reset link has been sent to your email ... ';
          console.log(mes);
          res.send(mes);
          return;
        }
      });
    }  
    else {
      res.send('user not registered');
      return;
    }
  }
);

});

app.get('/reset-password/:id/:token',(req,res,next)=>{
  const {id,token}=req.params;
  console.log(user);
  if(id!==user.user_id)
  {
      res.send('Invalid Id ... ');
      return;
  }
  //valid id
  const secret= JWT_SECRET+user.password;
  try{
      const payload=jwt.verify(token,secret);
      res.render('reset-password',{ email :user.email});
  }
  catch(error){
      console.log(error.message);
      res.send(error.message);
  }
});

app.post('/reset-password/:id/:token',(req,res,next)=>{
  const {id,token}=req.params;
  const {password,password2}=req.body;
  if(id!==user.user_id)
  {
      res.send('Invalid Id ... ');
      return;
  }
  //valid id
  const secret= JWT_SECRET+user.password;
  try{
      const payload=jwt.verify(token,secret);
      hashedPassword = bcrypt.hash(password, 10); 
      pool.query(
        `UPDATE users SET password =$1  WHERE user_id = id;`,
        [hashedPassword],
        (err, results) => {
          if (err) {
            throw err;
          }
          res.send("Updated Successfully");
        }
      );

//    
      res.send(user);
  }
  catch(error){
      console.log(error.message);
      res.send(error.message);
  }    
});

//aniket end2



app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});


//590421231063-fckjct9vmvbb417ijo4n9n5dkcctn7am.apps.googleusercontent.com
//3F_GSwj0_1AS7jJEhveNOaVc