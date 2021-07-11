//question feed related operations

const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");
const passport = require("passport");
const router = express.Router();

//ask a question - add_question(ask_question)
router.post("/add_question", async(req, res) => {
  const { user_id, question } = req.body;
  await pool.query(
    `INSERT INTO question_details (user_id, question)
              VALUES ($1, $2)`,
    [user_id, question],
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
