const express = require("express");
const router = express.Router();
const User = require("../models/User");

//get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//get specific user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.userId });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//create new user or login
router.post("/", async (req, res) => {
  if (req.body.type === "signup") {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    user
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.json({ message: "Username already taken." });
        } else {
          res.json({ message: "Server error." });
        }
      });
  } else {
    const user = await User.findOne({ username: req.body.username });
    if (!user || user.password !== req.body.password) {
      res.json({ message: "Invalid username or password." });
    } else {
      res.json(user);
    }
  }
});

module.exports = router;
