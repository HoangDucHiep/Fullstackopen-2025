const {beforeEach, test, after, describe} = require('node:test')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const assert = require('assert')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')


describe('User API tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test.only('users are returned as json', async t => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test.only('there are 1 initial user', async t => {
        const response = await api.get('/api/users')
        assert.strictEqual(response.body.length, 1)
    })

    test.only('a valid user can be added', async t => {
        const newUser = {
            username: "minh",
            name: "NNM",
            password: "password",
        }
        
        const userAtStart = await User.find({})

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await User.find({})

        assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)

        const contents = usersAtEnd.map(user => user.username)
        assert.ok(contents.includes(newUser.username))
    })


    after(async () => {
        await mongoose.connection.close()
    })    
})