const User = require('../models/userModel')

// signIn user
const signInUser = async (req, res) => {
    res.json({mssg: 'sign in user'})
}

// signUp user
const signUpUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.signup(username, email, password)

        res.status(200).json({username, email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signInUser, signUpUser }