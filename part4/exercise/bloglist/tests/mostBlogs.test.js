const { test, describe } = require('node:test')
const assert = require('assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./data')

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog equals the author of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: listWithOneBlog[0].author,
      blogs: 1
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})