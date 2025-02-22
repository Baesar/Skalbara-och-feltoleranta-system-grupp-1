const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const requireAuth = require('./middleware/requireAuth')

// Express app
const app = express()

// Proxy middleware for user-service
const userProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true
})

// Proxy middleware for booking-service
const bookingProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true
})

// User routes
app.use('/api/user/signin', userProxyMiddleware)
app.use('/api/user/signup', userProxyMiddleware)
app.use('/api/user', requireAuth, userProxyMiddleware)

// Booking routes
app.use('/api/booking', requireAuth, bookingProxyMiddleware)

// Start API Gateway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`)
})