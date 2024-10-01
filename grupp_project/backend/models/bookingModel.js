const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    // time: {
    //     type: Time???
    //     required: true
    // },
    details: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)