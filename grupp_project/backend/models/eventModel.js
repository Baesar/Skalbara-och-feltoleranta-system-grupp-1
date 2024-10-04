const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    place : {
        type : String , 
        required: true
    }
})