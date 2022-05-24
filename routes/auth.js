const router = require('express').Router()
const CryptoJS = require("crypto-js");
const User = require('../models/user')


//Register users
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PRIVATE_KEY).toString(),
        email: req.body.email,
    })
    try {
        const savedUser = await newUser.save()
        res.json(savedUser)
    } catch (err) {
        res.json({ message: err })
    }
})

//Uer Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PRIVATE_KEY).toString(CryptoJS.enc.Utf8)
        if (decrypted === req.body.password) {
            res.json({ message: 'User logged in' })
        } else {
            res.status(401).json({ message: 'Incorrect password' })
        }
    } catch (err) {
        res.json({ message: err })
    }
})


    module.exports = router