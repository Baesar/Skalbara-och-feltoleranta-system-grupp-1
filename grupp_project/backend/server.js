require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bookingRoutes = require('./routes/bookings.js')

const PORT = process.env.PORT || 5000;


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
//app.use('/api/bookings', bookingRoutes)
app.get("/api", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})

// connect to db
mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => { 
            console.log(`server started on port ${PORT}`) ;
        })
    })
    .catch((error) => {
        console.log(error);
    })

