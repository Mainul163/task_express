const User = require("../models/register.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = async (req, res) => {
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
};
module.exports = {
  loginUser,
};
