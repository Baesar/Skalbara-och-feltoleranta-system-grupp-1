const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema




const userSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sirname: {
        type: String,
        required: true
    },
    buildingAccess: {
        A: {
            type: Boolean,
            default: false
        },
        B: {
            type: Boolean,
            default: false
        }
    },
    accessLayers: {
        A: {
            type: String,
            default: ''
        },
        B: {
            type: String,
            default: ''
        }
    }
});


// static signin method
userSchema.statics.signin = async function(email, password) {

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

// static signup method
userSchema.statics.signup = async function(username, email, password) {
    
    const emailExists = await this.findOne({ email })
    if (emailExists) {
        throw Error('Email already in use')
    }

    const usernameExists = await this.findOne({ username })
    if (usernameExists) {
        throw Error('Username is aleady taken')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema)