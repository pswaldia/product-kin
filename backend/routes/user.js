//user related operations

const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");
const passport = require("passport");
const router = express.Router();

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.send({ status: "false", message: info.message }); //login unsuccessful
    req.logIn(user, function (err) {
      if (err) return next(err);
      return res.send({ status: "true", message: info.message }); //authenticated successfully
    });
  })(req, res, next);
});

router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, notification } = req.body;

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
        if (results.rows.length == 1) {
          return res.send({
            status: "false",
            message: "Email already registered",
          });
        } else {
          pool.query(
            `INSERT INTO users (name, email, password, notification)
                  VALUES ($1, $2, $3, $4)`,
            [name, email, hashedPassword, notification],
            (err, results) => {
              if (err) {
                throw err;
              }

              res.send({
                status: "true",
                message: "Registration Successfull",
              });
            }
          );

          //updating leaderboard table
          var points = 0;
          pool.query(
            `INSERT INTO leaderboard (name, points)
                  VALUES ($1, $2)`,
            [name, points],
            (err, results) => {
              if (err) {
                throw err;
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//forgot password
let user = {};
const jwt = require("jsonwebtoken"); //token
var nodemailer = require("nodemailer"); //mails

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/forgot-password", (req, res, next) => {
  const { email } = req.body;
  //fetching
  pool.query(
    `SELECT * FROM users
      WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      //   console.log(results);
      if (results.rows.length == 1) {
        user = results.rows[0];
        console.log(user);
        const secret = JWT_SECRET + results.rows[0].password;
        const payload = {
          email: results.rows[0].email,
          id: results.rows[0].user_id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "15m" });
        console.log(results.rows[0].user_id);
        const link =
          "http://localhost:4000/reset-password/" +
          results.rows[0].user_id +
          "/" +
          token;
        console.log(link);
        //send link
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.PK_EMAIL,
            pass: process.env.PK_PASSWORD,
          },
        });

        var mailOptions = {
          from: process.env.PK_EMAIL,
          to: email,
          subject: "Product Kin - Reset Password",
          text:
            "One time password Link, Click on the link to reset your password." +
            "\n The link will be valid for 15 minutes only.\n " +
            link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) console.log(error);
          else
            return res.send(
              "Password reset link has been sent to your email ... "
            );
        });
      } else {
        return res.send("user not registered");
      }
    }
  );
});

router.get("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  console.log("user in forgot password ", user);
  if (id !== user.user_id) {
    res.send("Invalid Id ... ");
    return;
  }
  //valid id
  const secret = JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post("/reset-password/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;
  if (id !== user.user_id) {
    res.send("Invalid Id ... ");
    return;
  }
  //valid id
  console.log("id is : ", id);
  const secret = JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    hashedPassword = await bcrypt.hash(password, 10);
    pool.query(
      `UPDATE users SET password =$1  WHERE user_id = $2;`,
      [hashedPassword, id],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.send("Updated Successfully");
      }
    );
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

//for google sign in


const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '364428087639-8k31roj34nr5i16nvn21m3anuj6hf93r.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

router.post("/googlelogin",(req,res) =>{
    let token=req.body.token;
    console.log(token); 
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      console.log(payload); // all information
      const userid = payload['sub'];
    }
    verify()
    .then(()=>{
        res.cookie('session-token', token);
        res.send('success');
    })
    .catch(console.error);
       
  });
  
  router.get('/logout', (req, res)=>{
    console.log("logout file check");
    res.clearCookie('session-token');
    res.redirect('/login');
  })
  
  router.get("/dashboard",checkAuthenticated,(req, res) => {
    console.log(req.user);
    let user=req.user;
    res.render('dashboard',{user});
  });
  
  function checkAuthenticated(req, res, next){
  
    let token = req.cookies['session-token'];
  
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
        console.log(err);
          res.redirect('/login')
      })
  
  }


module.exports = router;
