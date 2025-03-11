const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bookingRoutes = require('./routes/bookingRoutes')
const { createLogger, format, transports } = require('winston')

// Configure Winston logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),  // Logs to stdout
        new transports.File({ filename: 'logs/booking-service.log' }) // Saves logs to file
    ]
})

const PORT = process.env.PORT
const MONGO_URI = process.env.BOOKING_ATLAS_URI

// Express app
const app = express()
app.use(express.json())

// Middleware to log incoming requests
app.use((req, res, next) => {

    console.log(`Booking-Service Received: ${req.method} ${req.path}`)

    const userId  = req.headers['x-user-id']

    logger.info(`Booking-Service Received: ${req.method} ${req.path}`, { headers: req.headers })

    if (userId) {
        req.user = { _id: userId }
        logger.info('Booking-Service received x-user-id', { userId })
    } else {
        logger.warn('No x-user-id header found in request')
    }
    
    next()
})

// Routes
app.use('/', bookingRoutes)

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled server error', { error: err.message })
    res.status(500).json({ error: 'Internal Server Error' })
})

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Booking Service running on port ${PORT}`)
        })
    })
    .catch(error => {
        logger.error('Database connection error', { error: error.message })
        process.exit(1) // Exit process if DB connection fails
    })