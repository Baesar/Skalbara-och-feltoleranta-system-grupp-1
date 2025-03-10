const request = require('supertest')
const app = require('../app')
const User = require('../models/userModel')
const sendEmail = require('../controllers/mailController')

jest.mock('../models/userModel')
jest.mock('../controllers/mailController')

describe('User API Endpoint with Mocking', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    // GET / (happy)
    it('should fetch all users', async () => {
        const mockUsers = [
            { firstname: 'Firsty', lastname: 'Lastson', email: 'firsty@example.com', role: 'member' },
            { firstname: 'Gustav', lastname: 'Vasa', email: 'gusse@example.com', role: 'member' }
        ]
        User.find.mockResolvedValue(mockUsers)

        const res = await request(app).get('/')

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(mockUsers)
        expect(User.find).toHaveBeenCalledTimes(1)
    })

    // GET /:id (happy)
    it('should fetch a user by ID', async () => {
        const id = '67bb351f4f7e96c9b4177bd3'
        User.findById.mockResolvedValue(id)

        const res = await request(app).get(`/${id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(id)
        expect(User.findById).toHaveBeenCalledTimes(1)
    })

    // GET /:id (failing)
    it('should fail fetching a user by ID', async () => {
        const id = 'user123' // non-existing id
        User.findById.mockResolvedValue(id)

        const res = await request(app).get(`/${id}`)

        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({ error: 'No such user' })
    })
    
    // POST /create (happy)
    it('should create a new user', async () => {
        const newUser = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'member'
        }

        User.signup.mockResolvedValue(newUser)
        sendEmail.mockResolvedValue(true)

        const res = await request(app).post('/create').send(newUser)

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('firstname', 'John')
        expect(User.signup).toHaveBeenCalledWith(
            newUser.firstname,
            newUser.lastname,
            newUser.email,
            newUser.password,
            newUser.role
        )
        expect(sendEmail).toHaveBeenCalledWith(newUser.email, "Welcome to GetBetter!", "We are happy")
    })

    // POST /create (failing)
    it('should fail creating a new user with an existing email', async () => {
        const newUser = {
            firstname: 'Another Therapy',
            lastname: 'Booker',
            email: 'therapybooker@mail.com', // Already exists
            password: 'password123',
            role: 'member'
        }

        User.signup.mockRejectedValue(new Error('Email already in use'))

        const res = await request(app).post('/create').send(newUser)

        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('error', 'Email already in use')
        expect(User.signup).toHaveBeenCalledWith(
            newUser.firstname,
            newUser.lastname,
            newUser.email,
            newUser.password,
            newUser.role
        )
        expect(sendEmail).not.toHaveBeenCalledWith()
    })

    // DELETE /:id (happy)
    it('should delete a user by ID', async () => {
        const id = '67bb351f4f7e96c9b4177bd3'
        const mockUser = { _id: id }
        User.findOneAndDelete.mockResolvedValue(mockUser)

        const res = await request(app).delete(`/${id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(mockUser)
        expect(User.findOneAndDelete).toHaveBeenCalledWith({ _id: id })
    })

    // DELETE /:id (failing)
    it('should return 404 for a non-existent user', async () => {
        const invalidId = '507f1f77bcf86cd799439012'
        User.findOneAndDelete.mockResolvedValue(null)

        const res = await request(app).delete(`/${invalidId}`)

        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({ error: 'No such user' })
    })
})