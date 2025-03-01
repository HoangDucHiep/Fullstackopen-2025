const { test, describe } = require('node:test')
const assert = require('assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./data')



describe('favorite blog', () => { 
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})