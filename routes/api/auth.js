const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
//тест пользователя по токену
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
});
//авторизация существующего пользователя (логин)
router.post(
  "/",
  [
    check("email", "Требуется существующий почтовый адрес...").isEmail(),
    check("password", "Требуется пароль....").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Неверные входные данные" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Неверные входные данные" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });

      console.log(req.body);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Ошибка сервера...");
    }
  }
);

//обновление или создание профиля при его отсутствии
router.post("/", [auth, [check("contacts", "требуются контактные данные").not().isEmpty()]]);
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { contacts } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (contacts) profileFields.contacts = contacts;
  if (location) profileFields.location = location;

  try {
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
    console.error(err.message)
    res.status(500).send('ошибка сервера')
  }
}

module.exports = router;
