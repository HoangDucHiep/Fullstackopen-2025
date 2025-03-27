const {beforeEach, test, after} = require('node:test')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const assert = require('assert')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test.only('blogs are returned as json', async t => { 
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('there are 3 blogs', async t => {
    const response = await api.get('/api/blogs')
    console.log(response.body.length)
    assert.strictEqual(response.body.length, 3)
})