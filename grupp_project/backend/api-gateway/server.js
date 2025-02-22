const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const requireAuth = require('./middleware/requireAuth')

// Express app
const app = express()

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.path}`)
    next()
})

// Proxy middleware for user-service
const userProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
    logLevel: "debug",  // 🔥 Add this for better debugging
    pathRewrite: { '^/api/user': '' },  
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: ${proxyReq.path}`);
    }
})

// Proxy middleware for booking-service
const bookingProxyMiddleware = createProxyMiddleware({
    target: 'http://localhost:5002',
    changeOrigin: true,
    pathRewrite: { '^/api/booking': '' }
})

// User routes
// app.use('/api/user/signin', userProxyMiddleware)
// app.use('/api/user/signup', userProxyMiddleware)
app.use('/api/user', userProxyMiddleware)

// Booking routes
app.use('/api/booking', requireAuth, bookingProxyMiddleware)

// Start API Gateway
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`)
})