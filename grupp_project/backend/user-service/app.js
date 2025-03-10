const express = require('express')
require('dotenv').config()
const userRoutes = require('./routes/userRoutes.js')

// Express app
const app = express()
app.use(express.json())

// Routes
app.use('/', userRoutes)

// Middleware
app.use((req, res, next) => {
    console.log(`User-Service Received: ${req.method} ${req.path}`)
    next()
})

app.use((req, res, next) => {
    const userId = req.headers['x-user-id']
    if (userId) {
        req.user = { _id: userId }
    }
    next()
})

module.exports = app