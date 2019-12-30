import gql from 'graphql-tag';

export const PAGE = gql`
  query fetchPage {
    page {
      content {
        title
        type
        text
      }
      logo {
        text
        color
        font
      }
    }
  }
`;
