const express = require('express')

const router = express.Router();

// GET all bookings
router.get('/', (req, res) => {
    res.json({mssg: 'GET all bookings'})
});

// GET a single booking
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single booking'})
})

// POST a new booking
router.post('/', (req, res) => {
    res.json({mssg: 'POST a single booking'})
})

// DELETE a booking
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a booking'})
})

// PATCH a booking
router.patch('/:id', (req, res) => {
    res.json({mssg: 'PATCH a booking'})
})

module.exports = router;