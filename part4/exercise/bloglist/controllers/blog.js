const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body
  
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })


  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).end()
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'unauthorized' })
    }

    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    if (deletedBlog)
    {
      response.json(deletedBlog).status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    
    if (!blog) {
      return response.status(404).end()
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'unauthorized' })
    }

    const updatedBlog = {
      ...blog.toJSON(),
      likes: request.body.likes
    }

    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.json(savedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter