const express = require('express')

// controller functions
const { signInUser, signUpUser } = require('../controllers/userController')

const router = express.Router()

// signin route
router.post('/signin', signInUser)

// signup route
router.post('/signup', signUpUser)

module.exports = router