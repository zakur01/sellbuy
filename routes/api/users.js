const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

//регистрация
router.post(
  "/",
  [
    check("name", "Требуется имя пользователя").not().isEmpty(),
    check("email", "Требуется почтовый адрес").isEmail(),
    check(
      "password",
      "Введите пароль из минимум шести символов"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Пользователь уже существует" }] });
      }

      const avatar = gravatar.url(email, {
        s: "100",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({ token })
      });

      console.log(req.body);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Ошибка сервера...");
    }
  }
);

// //смена аватара
// router.post("/avatar", [auth], async (req, res) => {
//   const avatar = req.body;
//   const avatarField = {};
//   avatarField.user = req.user.id;
//   if (avatar) avatarField.avatar = avatar;
//   try {
//     let user = await User.findOne({ user: req.user.id})

//     if (user) {
//       user = await User.findByIdAndUpdate(
//         { user: req.user.id },
//         { $set: avatarField },
//         { new: true }
//       )
//       return res.json(user);

  
//     }
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send('324!!!аватар!')
//   }
// })


module.exports = router;

