const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const requireAuth = require('./middleware/requireAuth')

// Express app
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.path}`)
    next()
})

// User routes
app.use('/api/user', (req, res, next) => {
    console.log("Forwarding request to User Service")
    next()
}, createProxyMiddleware({
    target: 'http://user-service:5001/',
    changeOrigin: true,
    pathRewrite: { '^/api/user': '/' }
}))

// Booking routes
app.use('/api/booking', (req, res, next) => {
        requireAuth(req, res, () => {
            console.log(" User Authenticated:", req.user)

            if (req.user && req.user._id) {
                req.headers['x-user-id'] = req.user._id;
                console.log(`Added x-user-id Header: ${req.user._id}`);
            } else {
                console.log("No User ID Found!");
            }

            next()
        })
    }, createProxyMiddleware({
        target: 'http://booking-service:5002',
        changeOrigin: true,
        pathRewrite: { '^/api/booking': '/' },
        onProxyReq: (proxyReq, req, res) => {
            console.log("Forwarding Headers to Booking Service:", req.headers)
            if (req.headers['x-user-id']) {
                console.log(`Setting x-user-id: ${req.headers['x-user-id']}`)
                proxyReq.setHeader('x-user-id', req.headers['x-user-id']);
            } else {
                console.log("req.user is undefined - x-user-id NOT set")
            }
        }
    })
)

// Start API Gateway
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`)
})