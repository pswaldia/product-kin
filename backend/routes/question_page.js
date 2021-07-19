//question feed related operations

const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");
const passport = require("passport");
const { response } = require("express");
const router = express.Router();

//ask a question - add_question(ask_question)
router.post("/add_question", async(req, res) => {
  const { user_id, question, peer_cases, topic, hint } = req.body;
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
    `SELECT * FROM leaderboard ORDER BY points DESC`,
    (err, results) => {
      if(err)
        console.log(err);
      res.send(results.rows);
    }
  );
});

//Adding Queries(Get in touch)(add)
router.post("/add_query", async (req, res) => {
  const { first_name, email, message } = req.body;
  await pool.query(
    `INSERT INTO queries (first_name, email, message)
              VALUES ($1, $2, $3)`,
    [first_name, email, message],
    (err, results) => {
      if (err) {
        cosole.log(err);
        res.send({
          status: "false",
          message: "Unable to post you Meassage",
        })
      }
      res.send({
        status: "true",
        message: "Message Added Successfully",
      });
    }
  );
});

module.exports = router;
