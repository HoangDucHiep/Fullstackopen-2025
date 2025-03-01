const { test, describe } = require('node:test')
const assert = require('assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./data')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})




