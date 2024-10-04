const Booking = require('../models/bookingModel')
const mongoose = require('mongoose')

// get all bookings
const getBookings = async (req, res) => {
    const user_id = req.user._id

    const bookings = await Booking.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(bookings)
}

// get a single booking
const getBooking = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such booking'})
    }

    const booking  = await Booking.findById(id)

    if (!booking) {
        return res.status(404).json({error: 'No such booking'})
    }

    res.status(200).json(booking)
}

// create a new booking
const createBooking = async (req, res) => {
    const {date, time, /*user,*/ details } = req.body

    // add document to database
    try {
        const user_id = req.user._id
        const booking = await Booking.create({date, time, details, user_id})
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a booking
const deleteBooking = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such booking'})
    }

    const booking  = await Booking.findOneAndDelete({_id: id})

    if (!booking) {
        return res.status(404).json({error: 'No such booking'})
    }

    res.status(200).json(booking)
}

// update a workout
const updateBooking = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such booking'})
    }

    const booking = await Booking.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!booking) {
        return res.status(404).json({error: 'No such booking'})
    }

    res.status(200).json(booking)
}

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking
}