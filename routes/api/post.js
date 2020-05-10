const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

//создание объявления
router.post(
    "/",
    [
      auth,
      [check("text", "Пожалуйста введите текст объявления").not().isEmpty()],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
  
      const user = await User.findById(req.user.id).select("-password");
  
      try {
        const newPost = new Post({
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id,
        });
  
        const post = await newPost.save();
        res.json({ post, user });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Ошибка сервера");
      }
    }
  );

module.exports = router;
