const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");
const session = require("express-session");
const passport = require("passport");
var cors = require('cors');
const initializePassport = require("./passportConfig");
<<<<<<< HEAD
=======
require("dotenv").config();


>>>>>>> 50b2a9260326dd5ed72e8eb1c64823befda3a73e
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

<<<<<<< HEAD


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
    hashedPassword = bcrypt.hash(password, 10);
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



const JWT_SECRET = 'some super secret..'
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.set('view engine','ejs')


app.get('/',(req,res)=>{
  res.send("Hello world")
})

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
    if (results.rows.length == 1) {
      user=results.rows[0];
      console.log(user.password);
      const secret = JWT_SECRET + results.rows[0].password;
      const payload={
          email: results.rows[0].email,
          id: results.rows[0].user_id
      };
      const token = jwt.sign(payload,secret,{expiresIn:'15m'});
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

app.post('/reset-password/:id/:token',async (req,res,next)=>{
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
      hashedPassword = await bcrypt.hash(password, 10);
      pool.query(
        `UPDATE users SET password=$1  WHERE user_id= $2;`,
        [hashedPassword,id],
        (err, results) => {
          if (err) {
            throw err;
          }
          res.send("Updated Successfully");
        }
      );
  }
  catch(error){
      console.log(error.message);
      res.send(error.message);
  }    
});
 
app.get("/login",  (req, res) => {
  res.render("login");
});
app.post('/login123', function(req, res, next) {
  console.log("Normal");
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

app.post("/login",(req,res) =>{
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

app.get('/logout', (req, res)=>{
  console.log("logout file check");
  res.clearCookie('session-token');
  res.redirect('/login');
})

app.get("/dashboard",checkAuthenticated,(req, res) => {
  console.log(req.user);
  let user=req.user;
  res.render('dashboard',{user});
});

app.get('/protectedRoute', checkAuthenticated, (req,res)=>{
  res.send('This route is protected')
})

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
        res.redirect('/login')
    })

}
//Aniket end


=======
//routes
const userRouter = require("./routes/user.js");
const questionRouter = require("./routes/question_page.js")
//const answerRouter = require("./routes/answer_page.js")
app.use(userRouter);
app.use(questionRouter);
//app.use(answerRouter);


>>>>>>> 50b2a9260326dd5ed72e8eb1c64823befda3a73e
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
