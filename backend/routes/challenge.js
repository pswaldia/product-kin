const express = require("express");
const { pool } = require("../dbConfig");
const passport = require("passport");
const multer = require('multer');
const path = require('path');
const router = express.Router();


const filestorage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./uploadedfile')
    },
    filename: function(req, file, cb){
        cb(null, new Date().valueOf() +'_' +file.originalname)
    }
})
const upload= multer({storage: filestorage})

//upload answer
router.post('/answer', upload.single('file'), (req, res) => 
{
    const challenge_id = req.query.challenge_id;
    const user_id = req.query.user_id;
    const submission = req.body.submission;
    let {filename} = req.file;
    let filepath = req.file.path;
        pool.query(
            `INSERT INTO challenge_submissions(challenge_id, user_id, filname, filepath, submission)
                VALUES ($1, $2, $3, $4, $5)`,
            [challenge_id, user_id, filename, filepath, submission],
            (err, results) => {
            if (err) {
                throw err;
            }
            res.send({ success: true, file: {FileName: filename} });
            }
        );
})

//get challenge  by id
router.get("/challenge_id",async(req,res)=>{
    const challenge_id = req.query.challenge_id;
    try
    {
        await pool.query(
            `SELECT * FROM challenges WHERE challenge_id=$1`,
            [challenge_id],
            (err, results) => {
                if(err)
                {
                    console.log(err);
                }
                return res.send({ status: "OK", Challenges: results.rows }); 
            }
        );
    } 
    catch (error) {
            console.log(error.message);
            res.send(error.message);
        }    
})

//api to get active challenges
router.get("/active", async(req, res) => {
    let today = new Date();
    const date=today.toISOString().split('T')[0]
    console.log(date);
    try
    {
        await pool.query(
            `SELECT * FROM challenges WHERE challenge_date>=$1`,
            [date],
            (err, results) => {
                if(err)
                {
                    console.log(err);
                }
                return res.send({ status: "OK", Challenges: results.rows }); 
            }
        );
    } 
    catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
  });

// api to get past challenges
  router.get("/past", async(req, res) => {
    let today = new Date();
    const date=today.toISOString().split('T')[0]
    console.log(date);
    try
    {
        await pool.query(
            `SELECT * FROM challenges WHERE challenge_date<$1`,
            [date],
            (err, results) => {
                if(err)
                {
                    console.log(err);
                }
                return res.send({ status: "OK", Challenges: results.rows }); 
            }
        );
    } 
    catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
  });

  //download api - will give google drive link
  router.get("/download", function(req,res){
        res.send("download link drive link");
    });
    
  module.exports=router;