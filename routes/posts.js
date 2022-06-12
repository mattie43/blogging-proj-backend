const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//get all posts
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user");
  res.json(posts);
});

//get specific post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.postId });
    res.json(post);
  } catch (err) {
    res.json(err);
  }
});

//create new post
router.post("/", (req, res) => {
  const post = new Post({
    user_id: req.body.user_id,
    title: req.body.title,
    body: req.body.body,
  });
  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
