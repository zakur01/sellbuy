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

//просмотр всех объявлений
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      res.status(404).send("объявление не найдено");
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("ошибка сервера");
  }
});

//поиск объявления по id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send("0бъявление не найдено");
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).send("0бъявление не найдено");
    }
    res.status(500).send("Ошибка сервера");
  }
});

//удалить объявление
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ msg: "Объявление не найдено " });
    }
    if (post.user.toString() !== req.user.id) {
      res
        .status(401)
        .json({ msg: "Пользователь не авторизован удалять объявления" });
    }

    await post.remove();
    res.json({ msg: "Объявление удалено" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
});

//комментирование объявления
router.post(
  "/comment/:id",
  [auth, [check("text", "Введите комментарий").not().isEmpty()]],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comment.unshift(newComment);
      await post.save();
      res.json(post.comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

//удаление комментария
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);
    const comment = post.comment.find(
      comment => comment.id === req.params.comment_id
    );
    if (!comment) {
      res.status(404).json({ msg: "Комментарий отсутствует" });
    }
    if (comment.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "Вы не авторизованы удалять комментарии" });
    }
    const removeIndex = post.comment
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comment.splice(removeIndex, 1);
    await post.save();
    res.json('comment is deleted');
    res.json(post.comment)
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

module.exports = router;
