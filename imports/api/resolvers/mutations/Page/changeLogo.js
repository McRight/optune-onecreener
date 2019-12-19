import { getPage } from './utils/getPage'
import { updatePage } from './utils/updatePage'

const INCLUDED_FIELDS = {
  logo: 1,
}

export const changeLogo = function(root, { input }, { userId }) {
  /*
   * Get page & input
   */

  const { page } = getPage({ userId })
  const { logo } = page
  const { text } = input

  /*
   * Set values
   */

  const values = {
    logo: {
      text,
    },
  }

  /*
   * Update page
   */

  updatePage({ page, userId, values })

  console.log('Test')

  return true
}
