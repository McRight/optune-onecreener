/* eslint-env mocha */

// Tests that collections exists

import { assert } from 'chai'

import { Mutation } from './index'

describe(__filename, function() {
  context('Page', function() {
    it('changeContent', function() {
      assert.isFunction(Mutation.changeContent)
    })
    it('changeLogo', function() {
      assert.isFunction(Mutation.changeLogo)
    })
  })
})
