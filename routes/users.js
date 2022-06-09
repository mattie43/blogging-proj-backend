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

//create new user
router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
