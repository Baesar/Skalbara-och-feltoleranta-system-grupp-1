const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bookingRoutes = require('./routes/bookingRoutes')

const PORT = process.env.PORT
const MONGO_URI = process.env.BOOKING_ATLAS_URI

// Express app
const app = express()
app.use(express.json())

// Middleware
app.use((req, res, next) => {
    console.log(`Booking-Service Received: ${req.method} ${req.path}`)

    const userId  = req.headers['x-user-id']
    if (userId) {
        req.user = { _id: userId }
    }
    next()
})

// Routes
app.use('/', bookingRoutes)

// Connect to Booking Database
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Booking Service running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    });

//comment