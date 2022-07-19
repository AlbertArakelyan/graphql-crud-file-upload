import { gql } from '@apollo/client';

export const getMeQuery = gql`
  query Me {
    me {
      username
      email
      createdAt
      avatar
    }
  }
`;