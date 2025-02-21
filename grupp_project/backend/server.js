require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bookingRoutes = require('./routes/bookings.js')
const userRoutes = require('./routes/user.js')

const PORT = process.env.PORT;

// Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes
app.use('/api/bookings', bookingRoutes)
app.use('/api/user', userRoutes)

// Connect to database
mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        // Listen for requests
        app.listen(PORT, () => { 
            console.log(`server started on port ${PORT}`) ;
        })
    })
    .catch((error) => {
        console.log(error);
    })

