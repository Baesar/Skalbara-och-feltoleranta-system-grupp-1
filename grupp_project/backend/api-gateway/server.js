const express = require('express');
const { createLogger, format, transports } = require('winston');
const { createProxyMiddleware } = require('http-proxy-middleware');
const requireAuth = require('./middleware/requireAuth');

// Configure Winston logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/api-gateway.log' })
    ]
});

// Express app
const app = express();

app.use((req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.path}`);
    next();
});

// Proxy middleware for user-service
const userProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true
});

// Proxy middleware for booking-service
const bookingProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true
});

// User routes
app.use('/api/user', userProxyMiddleware);

// Booking routes
app.use('/api/booking', requireAuth, 
    (req, res, next) => {
        if (req.user) {
            req.headers['x-user-id'] = req.user._id;
            logger.info('Gateway set x-user-id header:', { userId: req.headers['x-user-id'] });
        }
        next();
    },
    bookingProxyMiddleware
);

// Start API Gateway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`API Gateway running on port ${PORT}`);
});
