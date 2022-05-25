const { query } = require('express')
const User = require('../models/user')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const router = require('express').Router()

//Update user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => { 
   if(req.body.password) {
       req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PRIVATE_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }
        ) 
        res.json(updatedUser)
    } catch (err) {
        res.json({ message: err })
    }
})

//Delete user
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json(deletedUser)
    } catch (err) {
        res.json({ message: err })
    }
})
 
//Get a user by id
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => { 
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
})

//Get all users
router.get('/', verifyTokenAndAdmin, async (req, res) => { 
    //Condition to return new users
    const query = req.query.new;
    try {
        //Condition to return limited number of new users
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(10)
            : await User.find();
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    }
})





module.exports = router