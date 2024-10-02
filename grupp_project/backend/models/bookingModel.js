const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        requires: true
    },
    details: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)