const express = require('express')

// Controller functions
const { signInUser, signUpUser , deleteUser , getUsers} = require('../controllers/userController')

const router = express.Router()

// Signin route
router.post('/signin', signInUser)

// Signup route
router.post('/signup', signUpUser)

//Get users
router.get('/', getUsers)

// delete users
router.delete('/:id' , deleteUser)
module.exports = router