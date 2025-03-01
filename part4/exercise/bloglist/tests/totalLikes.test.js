const { test, describe } = require('node:test')
const assert = require('assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./data')


describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0].likes)
  })
    
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  }) 
})