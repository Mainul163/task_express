const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  id: {
    type: String,
  },

  createdBy: {
    type: String,
    ref: "User",
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", menuSchema);
