const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT
const MONGO_URI = process.env.USER_ATLAS_URI

// Connect to User Database
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGO_URI)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`User Service running on port ${PORT}`)
            })
        })
        .catch(error => {
            console.log(error)
        })
}