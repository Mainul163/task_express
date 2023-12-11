const User = require("../models/register.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const registration = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  try {
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
          console.log("===============================");
          console.log(user);

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
};

module.exports = {
  registration,
};
