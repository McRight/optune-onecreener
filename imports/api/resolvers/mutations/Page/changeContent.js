import { getPage } from './utils/getPage'
import { updatePage } from './utils/updatePage'

export const changeContent = function(root, { input }, { userId }) {
  /*
   * Get page & input
   */

  const { page } = getPage({ userId })
  const { content } = page
  const { text, title, type } = input

  /*
   * Set values
   */

  const values = {
    content: {
      text,
      title,
      type,
    },
  }

  /*
   * Update page
   */

  updatePage({ page, userId, values })

  return true
}
