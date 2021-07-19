const express = require("express");
const { pool } = require("../dbConfig");
const router = express.Router();

//for showing single question in answer page
router.get("/get_question", async (req, res) => {
  const { ques_id } = req.body;
  await pool.query(
    `SELECT ques_id, question, hint FROM question_details where ques_id = $1`,
    [ques_id],
    (err, results) => {
      if (err) console.log(err);
      else {
        res.send(results.rows[0]);
      }
    }
  );
});

//providing details of all answers
router.get("/fetch_answers", async (req, res) => {
    try {
        const { ques_id } = req.body;
        const answers = await pool.query(`SELECT * FROM answer_details where ques_id = $1`,[ques_id]);
        for(const row of answers.rows){
            const user_pic = await pool.query("SELECT profile_pic FROM users where user_id = ($1)",[row.user_id]);
            const user_details = await pool.query("SELECT name, points FROM leaderboard where user_id = ($1)",[row.user_id]);
            row.profile_pic = user_pic.rows[0].profile_pic;
            row.name = user_details.rows[0].name;
            row.points = user_details.rows[0].points;
        }
        res.send(answers.rows)
    } catch (error) {
        console.log(error);
    }
});

//fetching all comments for a particular answer
router.get("/fetch_comments", async (req, res) => {
    try {
        const { ans_id } = req.body;
        const comment = await pool.query(`SELECT * FROM comment_details where ans_id = ($1)`,[ans_id]);
        for(const row of comment.rows){
            const user_details = await pool.query("SELECT name, profile_pic FROM users where user_id = ($1)",[row.user_id]);
            row.profile_pic = user_details.rows[0].profile_pic;
            row.name = user_details.rows[0].name;
            let dt = new Date(row.comment_date);
            let formattedDate = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(dt);
            row.comment_date = formattedDate;
        }
        res.send(comment.rows)
    } catch (error) {
        console.log(error);
    }
});

//add a new answer
router.post("/add_answer", async (req, res) => {
  const { user_id, ques_id, answer } = req.body;
  await pool.query(
    `INSERT INTO answer_details (user_id, ques_id, answer)
                VALUES ($1, $2, $3)`,
    [user_id, ques_id, answer],
    (err, results) => {
      if (err) {
        console.log(err);
        res.send({
          status: "false",
          message: "Unable to add Answer",
        });
      }
      const updateAnswerCount = pool.query(`UPDATE question_details SET answer_count = answer_count + 1 WHERE ques_id = ($1)`,[ques_id]);
      res.send({
        status: "true",
        message: "Answer Added Successfully",
      });
    }
  );
});

//add a new comment
router.post("/add_comment", async (req, res) => {
    const { user_id, ans_id, comment } = req.body;
    await pool.query(
      `INSERT INTO comment_details (user_id, ans_id, comment)
                  VALUES ($1, $2, $3)`,
      [user_id, ans_id, comment],
      (err, results) => {
        if (err) {
          console.log(err);
          res.send({
            status: "false",
            message: "Unable to add Comment",
          });
        }
        const updateCommentsCount = pool.query(`UPDATE answer_details SET comments_count = comments_count + 1 WHERE ans_id = ($1)`,[ans_id]);
        res.send({
          status: "true",
          message: "Comment Added Successfully",
        });
      }
    );
  });

module.exports = router;
