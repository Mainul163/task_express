require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("./models/user.model");
const saltRounds = 10;
const bodyParser = require("body-parser");
require("./confiq/database");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require("./confiq/passport");
app.get("/", (req, res) => {
  res.send("hello");
});

// const authenticateToken = passport.authenticate("jwt", { session: false });

// ****** register router *******
app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(400).send("user already exists");
    }

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      const newUser = new User({
        username: req.body.username,
        password: hash,
        role: req.body.role,
      });
      await newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: "user is created",
            user: {
              id: user._id,
              username: user.username,
              role: user.role,
            },
          });
        })
        .catch((error) => {
          res.send({
            success: false,

            message: "User is not created",
            error: error,
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ****** login router ********
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(401).send({
      success: false,
      message: "user is not found",
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      success: false,
      message: "Incorrect password",
    });
  }
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" });

  return res.status(200).send({
    success: true,
    message: "User is logged in successfully",
    token: token,
  });
});

// ****** profile router ********
// app.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // res.json(req.user);
//     return res.status(200).send({
//       success: true,
//     });
//   }
// );

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        role: req.user.role,
      },
    });
  }
);

app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).send("something broke !");
});
module.exports = app;
