// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const passport = require("passport");

// const registerRouter = require("./route/register.route");
// const loginRouter = require("./route/login.route");
// const profileRouter = require("./route/profile.route");
// const menuRouter = require("./route/menu.route");
// const bodyParser = require("body-parser");
// require("./confiq/database");
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
// app.use(bodyParser.json());
// app.use(cors());
// app.use(passport.initialize());
// require("./confiq/passport");

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// // const authenticateToken = passport.authenticate("jwt", { session: false });

// // ****** register router *******
// app.use("/register", registerRouter);

// // ****** login router ********

// app.use("/login", loginRouter);

// // ******** profile route ************
// app.use(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   profileRouter
// );

// // ****** menu route ******

// app.use(
//   "/menu",
//   passport.authenticate("jwt", { session: false }),

//   menuRouter
// );

// app.use((req, res, next) => {
//   res.status(404).json({
//     message: "route not found",
//   });
// });

// app.use((err, req, res, next) => {
//   res.status(500).send("something broke !");
// });
// module.exports = app;

///////chat gpt code/////

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const registerRouter = require("./route/register.route");
const loginRouter = require("./route/login.route");
const profileRouter = require("./route/profile.route");
const menuRouter = require("./route/menu.route");
const subMenuRouter = require("./route/submenu.route");
const bodyParser = require("body-parser");
const path = require("path");
require("./confiq/database");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require("./confiq/passport");

app.get("/", (req, res) => {
  res.send("hello");
});

// Use static middleware before route handling middleware
app.use(
  "/upload/images",
  express.static(path.join(__dirname, "upload/images"))
);

// const authenticateToken = passport.authenticate("jwt", { session: false });

// ****** register router *******
app.use("/register", registerRouter);

// ****** login router ********
app.use("/login", loginRouter);

// ******** profile route ************
app.use(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileRouter
);

// ****** menu route ******
app.use("/menu", menuRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

// ****** submenu route ******
app.use(
  "/submenu/images",
  express.static(path.join(__dirname, "submenu/images"))
);

app.use("/submenu", subMenuRouter);
app.use((err, req, res, next) => {
  res.status(500).send("something broke !");
});

module.exports = app;
