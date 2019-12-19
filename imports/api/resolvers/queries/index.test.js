/* eslint-env mocha */

// Tests that collections exists

import { assert } from 'chai'

import { Query } from './index'

describe(__filename, function() {
  it('page', function() {
    assert.isFunction(Query.page)
    assert.isUndefined(Query.user)
  })
})
