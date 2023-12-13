const mongoose = require("mongoose");
const submenuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },

  banglaLabel: {
    type: String,
    required: [true, "bangla label is required"],
  },

  englishLabel: {
    type: String,
    required: [true, "english label is required"],
  },

  menuId: {
    type: String,
    required: [true, "image is required"],
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

module.exports = mongoose.model("SubMenu", submenuSchema);
