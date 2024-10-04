const express = require('express')
const {
    getBookings,
    getBooking,
    createBooking,
    deleteBooking,
    updateBooking
} = require('../controllers/bookingController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router();

// require authentication for all booking routes
router.use(requireAuth)

// GET all bookings
router.get('/', getBookings);

// GET a single booking
router.get('/:id', getBooking)

// POST a new booking
router.post('/', createBooking)

// DELETE a booking
router.delete('/:id', deleteBooking)

// PATCH a booking
router.patch('/:id', updateBooking)

module.exports = router;