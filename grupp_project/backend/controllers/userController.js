const User = require('../models/userModel')

// signIn user
const signInUser = async (req, res) => {
    res.json({mssg: 'sign in user'})
}

// signUp user
const signUpUser = async (req, res) => {
    res.json({mssg: 'sign up user'})
}

module.exports = { signInUser, signUpUser }