/* eslint-env mocha */
import { assert } from 'chai'

import { Random } from 'meteor/random'
import { resetDatabase } from 'meteor/xolvio:cleaner'

// API
import { ContentType } from '/imports/api'

// Collections
import { Pages } from '/imports/db'

// Mutation
import { changeLogo } from './changeLogo'

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
      text: 'Logo Text Updated',
    }
    pageId = Pages.insert({
      content: {
        title: 'Test Title',
        text: 'Test Text',
        type: ContentType.TEXT,
      },
      logo: { text: 'Logo Text' },
      userId,
    })
    pageBefore = Pages.findOne(pageId)
  })

  it('change logo text', function() {
    assert.isTrue(changeLogo(null, { input: doc }, { userId }))

    const page = Pages.findOne({ _id: pageId })

    assert.ok(page)

    assert.equal(page.logo.text, doc.text)
    assert.deepEqual(page.content, pageBefore.content)
    assert.equal(page.userId, userId)
  })
})
