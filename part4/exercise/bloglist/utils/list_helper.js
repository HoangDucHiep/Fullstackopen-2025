const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs =>
  blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  if (blogs === null || blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, current) =>
    (prev.likes > current.likes) ? prev : current
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = blogs => {
  if (blogs === null || blogs.length === 0) {
    return null
  }

  const author = _.chain(blogs)
    .countBy('author')
    .toPairs()
    .maxBy(_.last)
    .value()

  return {
    author: author[0],
    blogs: author[1]
  }
}

const mostLikes = blogs => {
  if (blogs === null || blogs.length === 0) {
    return null
  }

  const author = _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, 'likes')
    }))
    .maxBy('likes')
    .value()

  return author
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}