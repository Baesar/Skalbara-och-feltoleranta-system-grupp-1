const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bookingRoutes = require('./routes/bookingRoutes');
const { createLogger, format, transports } = require('winston');

// Configure Winston logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/booking-service.log' })
    ]
});

const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.BOOKING_ATLAS_URI;

// Express app
const app = express();
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    logger.info(`Booking-Service Received: ${req.method} ${req.path}`);
    next();
});

app.use((req, res, next) => {
    const userId = req.headers['x-user-id'];
    logger.info('Booking-Service received x-user-id:', { userId });
    if (userId) {
        req.user = { _id: userId };
    }
    next();
});

// Routes
app.use('/', bookingRoutes);

// Connect to Booking Database
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Booking Service running on port ${PORT}`);
        });
    })
    .catch(error => {
        logger.error('Database connection error:', { error });
    });
