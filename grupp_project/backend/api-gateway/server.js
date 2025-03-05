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
        new transports.File({ filename: 'logs/api-gateway.log' }) // Save logs to file
    ]
});

// Express app
const app = express();

// Simulated startup status
let isServiceReady = false;

// Simulate delay before the service is fully ready
setTimeout(() => {
    isServiceReady = true;
}, 10000); // 10 seconds delay

// 🔹 Startup Probe: Ensures the app has started
app.get('/startup', (req, res) => {
    res.status(200).send('Started');
});

// 🔹 Readiness Probe: Ensures the app is ready for traffic
app.get('/readyz', (req, res) => {
    if (isServiceReady) {
        res.status(200).send('Ready');
    } else {
        res.status(503).send('Not Ready');
    }
});

// 🔹 Liveness Probe: Ensures the app is still running
app.get('/healthz', (req, res) => {
    res.status(200).send('Alive');
});

// Middleware to log incoming requests
app.use((req, res, next) => {
    logger.info(`Incoming Request: ${req.method} ${req.path}`);
    next();
});

// Proxy middleware for user-service
const userProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    onError: (err, req, res) => {
        logger.error(`User Service Proxy Error: ${err.message}`, { error: err });
        res.status(502).json({ error: 'Bad Gateway' });
    }
});

// Proxy middleware for booking-service
const bookingProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true,
    onError: (err, req, res) => {
        logger.error(`Booking Service Proxy Error: ${err.message}`, { error: err });
        res.status(502).json({ error: 'Bad Gateway' });
    }
});

// User routes
app.use('/api/user', userProxyMiddleware);

// Booking routes with authentication
app.use('/api/booking', requireAuth, 
    (req, res, next) => {
        if (req.user) {
            req.headers['x-user-id'] = req.user._id;
            logger.info('Gateway set x-user-id header', { userId: req.headers['x-user-id'] });
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
