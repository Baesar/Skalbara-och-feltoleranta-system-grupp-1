const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireAuth = (req, res, next) => {
    console.log("requireAuth Middleware Triggered")

    // Verify authentication
    const { authorization } = req.headers
    console.log("🔹 Authorization Header:", authorization)

    if (!authorization) {
        console.log("❌ No Authorization Header")
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = { _id }
        console.log('requireAuth set req.user:', req.user);
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth