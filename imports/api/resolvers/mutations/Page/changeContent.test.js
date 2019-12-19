/* eslint-env mocha */
import { assert } from 'chai'

import { Random } from 'meteor/random'
import { resetDatabase } from 'meteor/xolvio:cleaner'

// API
import { ContentType } from '/imports/api'

// Collections
import { Pages } from '/imports/db'

// Mutation
import { changeContent } from './changeContent'

const userId = Random.id()

let doc
let pageId
let pageBefore

describe(__filename, function() {
  before(function() {
    resetDatabase(null)
  })

  before(function() {
    doc = {
      title: 'Test Title',
      type: ContentType.TEXT,
      text: 'Test Text',
    }
    pageId = Pages.insert({
      content: { type: ContentType.NONE },
      logo: { text: 'Logo Text' },
      userId,
    })
    pageBefore = Pages.findOne(pageId)
  })

  it('change content', function() {
    assert.isTrue(changeContent(null, { input: doc }, { userId }))

    const page = Pages.findOne({ _id: pageId })

    assert.ok(page)

    assert.equal(page.content.title, doc.title)
    assert.equal(page.content.text, doc.text)
    assert.equal(page.content.type, doc.type)
    assert.deepEqual(page.logo, pageBefore.logo)
    assert.equal(page.userId, userId)
  })
})
