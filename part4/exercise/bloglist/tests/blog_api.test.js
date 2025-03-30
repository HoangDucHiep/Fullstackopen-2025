const {beforeEach, test, after, describe} = require('node:test')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const assert = require('assert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


describe('Blog API tests', () => { 

    let token;

    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()

        token = jwt.sign({ id: user.id }, process.env.SECRET)
        
        const blogsWithUser = helper.initialBlogs.map(blog => ({
            ...blog,
            user: user.id
        }))
        
        await Blog.insertMany(blogsWithUser)
    })

    test.only('blogs are returned as json', async t => { 
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test.only('there are 3 blogs', async t => {
        const response = await api.get('/api/blogs')
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
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, oldBlogs.length + 1)
        
        const contents = blogsAtEnd.map(blog => blog.title)
        assert.ok(contents.includes(newBlog.title))
    })

    test.only("add token without a token, respond with 401", async t => {
        const newBlog = {
            "title": "test",
            "author": "Hoang Duc Hiep",
            "url": "http://newurl.com"
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        
        assert.strictEqual(response.body.error, 'token missing')
    })

    test.only('if likes property is missing, it will default to 0', async t => {
        const newBlog = {
            "title": "test",
            "author": "Hoang Duc Hiep",
            "url": "http://newurl.com"
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })


    test.only('a blog can be deleted', async t => {
        const blogsAtStart = await Blog.find({})
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

        const res = await api.get(`/api/blogs/${blogToDelete.id}`)
        assert.strictEqual(res.status, 404)
    })

    test.only('a blog can be updated, update like', async t => {
        const blogsAtStart = await Blog.find({})
        const blogToUpdate = blogsAtStart[0]

        const updatedBlog = {
            ...blogToUpdate.toJSON(),
            likes: blogToUpdate.likes + 1
        }

        const res = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blog = res.body
        assert.strictEqual(blog.likes, updatedBlog.likes)
        assert.strictEqual(blog.title, updatedBlog.title)
        assert.strictEqual(blog.author, updatedBlog.author)
        assert.strictEqual(blog.url, updatedBlog.url)
        assert.strictEqual(blog.id, updatedBlog.id)
    })

    
})

after(async () => {
    await mongoose.connection.close()
})
