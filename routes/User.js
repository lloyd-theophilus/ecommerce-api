const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken')
const router = require('express').Router()

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => { 
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PRIVATE_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedUser)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router