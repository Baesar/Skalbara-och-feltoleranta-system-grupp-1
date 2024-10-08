const Booking = require('../models/bookingModel')
const mongoose = require('mongoose')

const timeOrder = {
    '10:00 - 11:00 AM': 1,
    '11:00 - 12:00 PM': 2,
    '13:00 - 14:00 PM': 3,
    '15:00 - 16:00 PM': 4
}

// Get all bookings of a certain user
const getBookings = async (req, res) => {
    const user_id = req.user._id

    const bookings = await Booking.find({ user_id }).sort({date: 1})
    
    bookings.sort((a, b) => timeOrder[a.time] - timeOrder[b.time])

    res.status(200).json(bookings)
}

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ date: 1 })

        bookings.sort((a, b) => timeOrder[a.time] - timeOrder[b.time])

        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

// Get a single booking
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

// Create a new booking
const createBooking = async (req, res) => {
    const {date, time, details } = req.body

    // add document to database
    try {
        const user_id = req.user._id
        const booking = await Booking.create({date, time, details, user_id})
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a booking
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

// Update a workout
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
    getAllBookings,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking
}