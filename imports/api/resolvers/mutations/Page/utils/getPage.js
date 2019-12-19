import { Meteor } from 'meteor/meteor'

import { Pages } from '/imports/db'

export const getPage = ({ userId }) => {
  /*
   * Check user logged in
   */

  if (!userId)
    throw new Meteor.Error(
      'AccessDenied',
      'You must be logged in to update the page'
    )

  const page = Pages.findOne({ userId })

  /*
   * Get & check page
   */

  if (!page)
    throw new Meteor.Error(
      'Pages.NotFound',
      'No page could be found for the user'
    )

  return { page }
}
