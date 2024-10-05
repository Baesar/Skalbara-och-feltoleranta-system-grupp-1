const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const sendEmail = require('../controllers/mailController')

// function to generate a json web token for a given id
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// signIn user
const signInUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signin(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signUp user
const signUpUser = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body

    try {
        const user = await User.signup(firstname, lastname, email, password, role)

        // create a token for the user
        const token = createToken(user._id)

        // Send a mail to the newly signed up user
        await sendEmail(email, "Welcome to GetBetter!", "We are happy")

        res.status(200).json({firstname, lastname, email, role, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signInUser, signUpUser }