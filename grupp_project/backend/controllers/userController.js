const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

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
// role , email , password , name, sirname, age , id, buildingAccess, accesslayer
// signUp user
const signUpUser = async (req, res) => {
    const { roles ,email , password , name, sirname, age} = req.body


    try {
        const user = await User.signup(roles ,email , password , name, sirname, age)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({roles , email , password , name, sirname, age, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { signInUser, signUpUser }