const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//информация о своём профиле
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "отсутствует профиль для этого пользователя" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("ошибка сервера");
  }
});

//просмотр списка всех пользователей
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("ошибка сервера");
  }
});

//обновление контактных данных или создание профиля при его отсутствии
router.post(
  "/",
  [auth, [check("contacts", "требуются контактные данные").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { contacts } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (contacts) profileFields.contacts = contacts;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("ошибка сервера");
    }
  }
);

//удаление пользователя
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.json({ msg: "пользователь удалён" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("ошибка сервера");
  }
});

//доступ к профилю через id
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "server"]);

      if (!profile) {
        return res.status(400).json({ msg: "такого профиля не существует"})
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("ошибка сервера");
  }
});

module.exports = router;
