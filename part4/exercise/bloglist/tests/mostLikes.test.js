const { test, describe } = require('node:test')
const assert = require('assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./data')

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog equals the author of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})