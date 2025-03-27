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

test.only('blogs have id property', async t => { 
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.ok(blog.id)
})

test.only('a valid blog can be added', async t => {
    const oldBlogs = await Blog.find({})

    const newBlog = {
        "title": "test",
        "author": "Hoang Duc Hiep",
        "url": "http://newurl.com",
        "likes": 1000
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, oldBlogs.length + 1)
    
    // check if the new blog is in the list of blogs
    const contents = blogsAtEnd.map(blog => blog.title)
    assert.ok(contents.includes(newBlog.title))
})

test.only('if likes property is missing, it will default to 0', async t => {
    const newBlog = {
        "title": "test",
        "author": "Hoang Duc Hiep",
        "url": "http://newurl.com"
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blog = response.body
    assert.strictEqual(blog.likes, 0)
})


test.only('if title and url are missing, respond with 400', async t => {
    const newBlog = {
        "author": "Hoang Duc Hiep",
        "likes": 1000
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

})