const express = require('express')
const { createProxyServer } = require('http-proxy')
const requireAuth = require('./middleware/requireAuth')

const app = express()
const proxy = createProxyServer()

// Middleware for logging requests

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
        new transports.File({ filename: 'logs/api-gateway.log' }) // Save logs to file
    ]
});


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

// Forward requests to user-service
app.use('/api/user', (req, res) => {
    console.log(`Forwarding request to User Service: ${req.method} ${req.originalUrl}`)
    proxy.web(req, res, { target: 'http://user-service.default.svc.cluster.local:80' })
})

// Forward requests to booking-service
app.use('/api/booking', requireAuth, (req, res) => {
    console.log(`Forwarding request to Booking Service: ${req.method} ${req.originalUrl}`)

    req.headers['x-user-id'] = req.user._id

    proxy.web(req, res, { 
        target: 'http://booking-service.default.svc.cluster.local:80', 
        headers: { 'x-user-id': req.user._id } 
    })
})


// Start API Gateway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`API Gateway running on port ${PORT}`);
});
