const express = require('express')

// Controller functions
const { signInUser, signUpUser } = require('../controllers/userController')

const router = express.Router()

// Signin route
router.post('/signin', signInUser)

// Signup route
router.post('/signup', signUpUser)

module.exports = router