const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require('config');
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');
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
    check(
      "password",
      "Требуется пароль...."
    ).exists(),
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

      if(!isMatch) {
          return res
          .status(400)
          .json({ errors: [{ msg: "Неверные входные данные"}]});
        }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      console.log(req.body);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Ошибка сервера...");
    }
  }
);

module.exports = router;
