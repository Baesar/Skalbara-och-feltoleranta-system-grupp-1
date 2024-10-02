const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// get all users
const getUsers = async (req, res) => {
    const users = await User.find({})

    res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user  = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)
}