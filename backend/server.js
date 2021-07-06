const express = require("express");
const bcrypt = require("bcrypt");
const { pool } = require("./dbConfig");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./passportConfig");
require("dotenv").config();

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


app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
