const express = require('express')
const {
    getBookings,
    getAllBookings,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking
} = require('../controllers/bookingController')

const router = express.Router()

// GET all bookings of a certain user
router.get('/', getBookings)

// GET all bookings
router.get('/all', getAllBookings)

// GET a single booking
router.get('/:id', getBooking)

// POST a new booking
router.post('/', createBooking)

// DELETE a booking
router.delete('/:id', deleteBooking)

// PATCH a booking
router.patch('/:id', updateBooking)

module.exports = router