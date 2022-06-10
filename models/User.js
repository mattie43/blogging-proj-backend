const mongoose = require("mongoose");

const User = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username already taken."],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", User);
