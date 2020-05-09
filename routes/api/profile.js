const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require('../../models/User')
const Profile = require('../../models/Profile')

//информация о своём профиле
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: "отсутствует профиль для этого пользователя"})
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('ошибка сервера')
    }
})

//просмотр списка всех пользователей
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.log(err.message)
        res.status(500).send('ошибка сервера')
    }
})

module.exports = router;