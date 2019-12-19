import { Random } from 'meteor/random'

import { Pages } from '/imports/db'

export const loadData = () => {
  const pages = Pages.find()
  let userId

  if (pages.count() === 0) {
    userId = Random.id()
    Pages.insert({
      content: {
        title: 'Test Page',
        text: 'Main content text',
        type: 'TEXT',
      },
      logo: {
        text: '',
      },
      userId,
    })
  } else {
    const page = pages.fetch()[0]
    userId = page.userId
  }

  return userId
}
