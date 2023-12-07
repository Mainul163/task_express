const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "id is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password is required"],
    unique: true,
  },

  role: {
    type: String,
    required: [true, "role is required"],
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
