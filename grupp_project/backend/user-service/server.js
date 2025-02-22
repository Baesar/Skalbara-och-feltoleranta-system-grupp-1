const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes.js')

const PORT = process.env.PORT
const MONGO_URI = process.env.USER_ATLAS_URI

// Express app
const app = express()
app.use(express.json())

// Routes
app.use('/api/user', userRoutes)

// Middleware
app.use((req, res, next) => {
    console.log(`User-Service Received: ${req.method} ${req.path}`)
    next()
})

// Connect to User Database
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`User Service running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    });