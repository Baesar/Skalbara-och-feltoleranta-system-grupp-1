const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const sendEmail = require('./mailController.js')
const mongoose = require('mongoose')
const logger = require('../../common/logger')

// Function to generate a json web token for a given id
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// SignIn user
const signInUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signin(email, password)

        const firstname = user.firstname
        const lastname = user.lastname
        const role = user.role


        // create a token
        const token = createToken(user._id)

        logger.info(`User ${user._id} signed in`)
        res.status(200).json({firstname, lastname, email, role, token})
    } catch (error) {
        logger.error(`User failed to sign in. Attemped email: ${email ? email : 'no email'}`)
        res.status(400).json({error: error.message})
    }
}

// SignUp user
const signUpUser = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body

    try {
        const user = await User.signup(firstname, lastname, email, password, role)

        // Create a token for the user
        const token = createToken(user._id)

        // Send a mail to the newly signed up user
        await sendEmail(email, "Welcome to GetBetter!", "We are happy")

        logger.info(`User ${user._id} signed up to GetBetter`)
        res.status(200).json({firstname, lastname, email, role, token})
    } catch (error) {
        logger.error(`User failed to sign up. Attempted email: ${email ? email : 'no email'}`)
        res.status(400).json({error: error.message})
    }
}

const getUsers = async (req, res) => {
    try {
        // Fetch all users where the role is not 'admin'
        const users = await User.find({ role: { $ne: 'admin' } });
        res.status(200).json(users); // Send back the users as a response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle error
    }
};

const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }

    res.status(200).json(user)
};

const createUser = async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body

    try {
        const user = await User.signup(firstname, lastname, email, password, role)

        // Send a mail to the newly signed up user
        await sendEmail(email, "Welcome to GetBetter!", "We are happy")

        logger.info(`User ${user._id} created by admin`)
        res.status(200).json({firstname, lastname, email, role})
    } catch (error) {
        logger.error(`Admin failed to create user`)
        res.status(400).json({error: error.message})
    }
}

const deleteUser = async (req, res ) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.error(`Admin tried to deleted non-existent user`)
        return res.Status(404).json({error : 'no such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        logger.error(`Admin tried to deleted non-existent user`)
        return res.status(404).json({error: 'no such user'})
    }

    logger.info(`User ${user._id} deleted by admin`)
    res.status(200).json(user)
}
module.exports = { signInUser, signUpUser, getUsers, getUser, createUser, deleteUser }