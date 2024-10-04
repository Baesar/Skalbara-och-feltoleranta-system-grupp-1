import { schema } from './bookingModel'

const mongoose = require('mongoose')

const Schema = mongoose.Schema
//ordered by date and time in order
const requestSchema = new schema({
    date: {
        type: Date,
        required: true
    },
    comment : {
        type : String ,
        required : true 
    },
    person : {
        type : String ,
        required : true
    }

})

module.exports = mongoose.model('request', requestSchema)