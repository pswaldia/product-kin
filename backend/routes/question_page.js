//question feed related operations

const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");
const passport = require("passport");
const { response } = require("express");
var nodemailer = require("nodemailer"); //mails
const router = express.Router();
const jwt = require("jsonwebtoken"); //token
// const authenticateToken = require("./user.js")
// console.log(authenticateToken);

//ask a question - add_question(ask_question)
router.post("/add_question", authenticateToken ,async(req, res) => {

  const { question, peer_cases, topic, hint } = req.body;
  const user_id = req.user.user_id;

  await pool.query(
    `INSERT INTO question_details (user_id, question, peer_cases, topic, hint )
              VALUES ($1, $2, $3, $4, $5)`,
    [user_id, question, peer_cases, topic, hint],
    (err, results) => {
      if (err) {
        console.log(err);
        res.send({
          status: "false",
          message: "Unable to add Question",
        })
      }
      res.send({
        status: "true",
        message: "Question Added Successfully",
      });
    }
  )
});

//get all questions - fetch_questions
router.get("/fetch_questions/all", async(req, res) => {
  await pool.query(
    `SELECT * FROM question_details ORDER BY question_date DESC, ques_id DESC`,
    (err, results) => {
      if(err)
        console.log(err);
      else{
        let page_id = 1, cnt = 0;
        results.rows.forEach(result => {
          let dt = new Date(result.question_date);
          let formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(dt);
          result.question_date = formattedDate;
          if(cnt == 5){
            cnt = 0;
            page_id++;
          }
          cnt++;
          result.page_id = page_id;
        });
        res.send(results.rows);
      }
    }
  );
});

//questions for peer cases
router.get("/fetch_questions/peer_cases", async(req, res) => {
  await pool.query(
    `SELECT * FROM question_details where peer_cases = true ORDER BY question_date DESC, ques_id DESC`,
    (err, results) => {
      if(err)
        console.log(err);
      else{
        let page_id = 1, cnt = 0;
        results.rows.forEach(result => {
          let dt = new Date(result.question_date);
          let formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(dt);
          result.question_date = formattedDate;
          if(cnt == 5){
            cnt = 0;
            page_id++;
          }
          cnt++;
          result.page_id = page_id;
        });
        res.send(results.rows);
      }
    }
  );
});

//questions for practice cases
router.get("/fetch_questions/practice_cases", async(req, res) => {
  await pool.query(
    `SELECT * FROM question_details where peer_cases = false ORDER BY question_date DESC, ques_id DESC`,
    (err, results) => {
      if(err)
        console.log(err);
      else{
        let page_id = 1, cnt = 0;
        results.rows.forEach(result => {
          let dt = new Date(result.question_date);
          let formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(dt);
          result.question_date = formattedDate;
          if(cnt == 5){
            cnt = 0;
            page_id++;
          }
          cnt++;
          result.page_id = page_id;
        });
        res.send(results.rows);
      }
    }
  );
});


//get leaderboard
router.get("/get_leaderboard", async(req, res) => {
  await pool.query(
    `SELECT L.user_id, L.name, L.points, U.profile_pic FROM leaderboard L, users U where U.user_id = L.user_id ORDER BY points DESC limit 5`,
    (err, results) => {
      if(err)
        console.log(err);
      res.send(results.rows);
    }
  );
});

//Adding Queries(Get in touch)(add)
router.post("/add_query", async (req, res) => {

  const { name, email, message } = req.body;
  await pool.query(
    `INSERT INTO queries (first_name, email, message)
              VALUES ($1, $2, $3)`,
    [name, email, message],
    (err, results) => {
      if (err) {
        cosole.log(err);
        res.send({
          status: "false",
          message: "Unable to post you Meassage",
        })
      }
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.PK_EMAIL,
          pass: process.env.PK_PASSWORD,
        },
      });
      var mailOptions = {
        from: process.env.PK_EMAIL,
        to: process.env.PK_EMAIL,
        subject: "Query Update from User",
        text: "Query Update\n\n\nName: "+name+"\n\nEmail: "+email+"\n\nMessage: "+message
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
      });




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
        subject: "Product Kin Support",
        text: "Thank you "+name+",\n\n\nHappy you reached out to us😌.\n\nWe will get back to you🙂.\n\n\n"+"Product Kin Support Team"
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
      });
      res.send({
        status: "true",
        message: "Message Added Successfully",
      });
    }
  );
});


//get all questions - fetch_questions
router.get("/fetch_questions/all/:topic", async(req, res) => {
  const {topic}=req.params;
  await pool.query(
    `SELECT * FROM question_details WHERE topic=$1 ORDER BY question_date DESC, ques_id DESC`,
    [topic],(err, results) => {
      if(err)
        console.log(err);
      else{
        let page_id = 1, cnt = 0;
        results.rows.forEach(result => {
          let dt = new Date(result.question_date);
          let formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(dt);
          result.question_date = formattedDate;
          if(cnt == 5){
            cnt = 0;
            page_id++;
          }
          cnt++;
          result.page_id = page_id;
        });
        res.send(results.rows);
      }
    }
  );
});

//questions for peer cases
router.get("/fetch_questions/peer_cases/:topic", async(req, res) => {
  const {topic}=req.params;
  await pool.query(
    `SELECT * FROM question_details WHERE (peer_cases = true AND topic=$1) ORDER BY question_date DESC, ques_id DESC`,
    [topic],
    (err, results) => {
      if(err)
        console.log(err);
      else{
        let page_id = 1, cnt = 0;
        results.rows.forEach(result => {
          let dt = new Date(result.question_date);
          let formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(dt);
          result.question_date = formattedDate;
          if(cnt == 5){
            cnt = 0;
            page_id++;
          }
          cnt++;
          result.page_id = page_id;
        });
        res.send(results.rows);
      }
    }
  );
});

//questions for practice cases
router.get("/fetch_questions/practice_cases/:topic", async(req, res) => {
  const {topic}=req.params;
  await pool.query(
    `SELECT * FROM question_details WHERE (peer_cases = false AND topic=$1)  ORDER BY question_date DESC, ques_id DESC`,
    [topic],
    (err, results) => {
      if(err)
        console.log(err);
      else{
        let page_id = 1, cnt = 0;
        results.rows.forEach(result => {
          let dt = new Date(result.question_date);
          let formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(dt);
          result.question_date = formattedDate;
          if(cnt == 5){
            cnt = 0;
            page_id++;
          }
          cnt++;
          result.page_id = page_id;
        });
        res.send(results.rows);
      }
    }
  );
});


router.get("/fetch_questions/:search", async(req, res) => {
  const {search}=req.params;
  await pool.query(
    `SELECT * FROM question_details WHERE (question LIKE $1)  ORDER BY question_date DESC, ques_id DESC`,
    ['%'+search+'%'],(err, results) => {
      if(err)
        console.log(err);
      else{
        let page_id = 1, cnt = 0;
        results.rows.forEach(result => {
          let dt = new Date(result.question_date);
          let formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(dt);
          result.question_date = formattedDate;
          if(cnt == 5){
            cnt = 0;
            page_id++;
          }
          cnt++;
          result.page_id = page_id;
        });
        if(results.rows.length>0)
        {
          res.send(results.rows);
        }
        else
        {
          res.send("No Question Found");
        }
      }
    }
  );
});

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null) return res.sendStatus(401); //dont have valid token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_details) => {
    if(err) return res.sendStatus(403); //invalid token
    req.user = user_details;
    next();
  })
}

module.exports = router;

// 3 apis for topic
//search option