import { gql } from '@apollo/client';

export const GET_POSTS_QUERY = gql`
  query {
    allPosts {
      id
      title
      content
    }
  }
`;

export const GET_POST_QUERY = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      id
      title
      content
      author {
        username
        email
      }
      createdAt
    }
  }
`;

export const ADD_POST_MUTATION = gql`
  mutation AddPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      title
      content
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`;

export const EDIT_POST_MUTATION = gql`
  mutation EditPost($editPostId: ID!, $content: String, $title: String) {
    editPost(id: $editPostId, content: $content, title: $title) {
      id
    }
  }
`;