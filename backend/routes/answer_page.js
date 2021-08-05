const express = require("express");
const { pool } = require("../dbConfig");
const router = express.Router();
const jwt = require("jsonwebtoken"); //token
var nodemailer = require("nodemailer"); //mails

//for showing single question in answer page
router.get("/discuss/get_question/:ques_id", async (req, res) => {
  const { ques_id } = req.params;
  await pool.query(
    `UPDATE question_details SET views_count=views_count+1 where ques_id = $1`,
    [ques_id],
    (err, results) => {
      if (err) console.log(err);
    }
  );
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
router.get("/discuss/fetch_answers/:ques_id", async (req, res) => {
    try {
        const { ques_id } = req.params;
        const answers = await pool.query(`SELECT * FROM answer_details where ques_id = $1 ORDER BY ans_id DESC`,[ques_id]);
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
router.get("/fetch_comments/:ans_id", async (req, res) => {
    try {
        const { ans_id } = req.params;
        const comment = await pool.query(`SELECT * FROM comment_details where ans_id = ($1) ORDER BY cmd_id DESC`,[ans_id]);
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
router.post("/add_answer",authenticateToken, async (req, res) => {
  const { ques_id, answer } = req.body;
  const user_id = req.user.user_id;
  
  await pool.query(
    `INSERT INTO answer_details (user_id, ques_id, answer)
                VALUES ($1, $2, $3)`,
    [user_id, ques_id, answer],
    async(err, results) => {
      if (err) {
        console.log(err);
        res.send({
          status: "false",
          message: "Unable to add Answer",
        });
      }
      let answer_name;
      await pool.query(
        `SELECT name from users where user_id=($1)`,
        [user_id],
        (err, results) => {
          answer_name=results.rows[0].name;
        }
      )

      let ques_user_id,question;
      await pool.query(
        `SELECT user_id,question from question_details where ques_id=($1)`,
        [ques_id],
        async(err, results) => {
          ques_user_id=results.rows[0].user_id;
          question=results.rows[0].question;

        var email_id,question_name;
        await pool.query(
          `SELECT email,name from users where user_id=($1)`,
          [ques_user_id],
          (err, results) => {
            email_id=results.rows[0].email;
            question_name=results.rows[0].name;

            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.PK_EMAIL,
                pass: process.env.PK_PASSWORD,
              },
            });
            console.log(req);
            const link = "http://localhost:3000/discuss/"+ques_id;
            var mailOptions = {
              from: process.env.PK_EMAIL,
              to: email_id,
              subject: "New Answer Added From: "+answer_name,

              text: "Hi "+question_name+",\n\nUpdate from Product Kin, You may be interested in the new answer on your question.\n\n"+"Click on the link below to check:\n\n"+link+"\n\nNew Answer Added By - "+answer_name+"\n\n\n"+"Thanks,\nProduct Kin Support Team"
            };
          
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) console.log(error);
            });
          }
        )
        }
      )

      //pick user id from question_details
      const updateAnswerCount = async() =>{
        await pool.query(`UPDATE question_details SET answer_count = answer_count + 1 WHERE ques_id = ($1)`,[ques_id]);
      } 
      updateAnswerCount();

      const updateLeaderboard = async() =>{
        await pool.query(`UPDATE leaderboard SET points = points + 10 WHERE user_id = ($1)`,[user_id]);
      } 
      if(user_id != 6)
          updateLeaderboard();
      // updateLeaderboard();
      res.send({
        status: "true",
        message: "Answer Added Successfully",
      });
    }
  );
});

//add a new comment
router.post("/add_comment", authenticateToken, async (req, res) => {
    const { ans_id, comment } = req.body;
    const user_id = req.user.user_id;
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

        const updateCommentsCount = async() => {
          await pool.query(`UPDATE answer_details SET comments_count = comments_count + 1 WHERE ans_id = ($1)`,[ans_id]);
        } 
        updateCommentsCount();
        const updateLeaderboard = async() =>{
          await pool.query(`UPDATE leaderboard SET points = points + 5 WHERE user_id = ($1)`,[user_id]);
        } 
        if(user_id != 6)
          updateLeaderboard();
        res.send({
          status: "true",
          message: "Comment Added Successfully",
        });
      }
    );
  });

  //upvote
  router.post("/upvote", authenticateToken, async (req, res) => {
    const { ans_id} = req.body;

    await pool.query(
      `UPDATE answer_details SET upvotes_count = upvotes_count + 1 WHERE ans_id = ($1)`,[ans_id]),
      (err, results) => {
        if (err) {
          console.log(err);
          res.send({
            status: "false",
            message: "Unable to add Vote",
          });
        }
        res.send({
          status: "true",
          message: "Comment Added Successfully",
        });
      }
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

