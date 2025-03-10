const express = require('express')

// Controller functions
const { signInUser, signUpUser, getUsers, getUser, createUser, deleteUser } = require('../controllers/userController')

const router = express.Router()

// Signin route
router.post('/signin', signInUser)

// Signup route
router.post('/signup', signUpUser)

//Get users
router.get('/', getUsers)

//Get a single user
router.get('/:id', getUser)

// Create a user
router.post('/create', createUser)

// delete users
router.delete('/:id' , deleteUser)

module.exports = router