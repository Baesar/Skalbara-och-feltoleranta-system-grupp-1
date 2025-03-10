const express = require('express')
const { createProxyServer } = require('http-proxy')
const requireAuth = require('./middleware/requireAuth')

const app = express()
const proxy = createProxyServer()

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.path}`)
    next()
})

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
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`)
})

//comment for change