import { Pages } from '/imports/db'

import { getUpdateFields } from './getUpdateFields'
import { getUpdateModifier } from './getUpdateModifier'

export const updatePage = ({ page, userId, values }) => {
  const { updateValues } = getUpdateFields({
    values,
    initialValues: page,
  })

  const pageModifier = getUpdateModifier({ updateValues })

  try {
    Pages.update({ _id: page._id }, pageModifier)
  } catch (error) {
    console.error(error)
    throw new Meteor.Error('Update failed', error)
  }
}
