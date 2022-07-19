import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;