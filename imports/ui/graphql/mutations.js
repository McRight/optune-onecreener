import gql from 'graphql-tag'

/*
 * Edit Page
 */

export const CHANGE_CONTENT = gql`
  mutation changeContent($values: ContentInput!) {
    changeContent(input: $values)
  }
`

export const CHANGE_LOGO = gql`
  mutation changeLogo($values: LogoInput!) {
    changeLogo(input: $values)
  }
`
