const { gql } = require('apollo-server-express');

const typeDefs = gql `
    scalar DateTime
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    type Post {
        id:ID,
        title:String,
        content:String,
        author:User,
        createdAt:DateTime,
        updatedAt:DateTime
    }
    type User {
        id:ID,
        username:String,
        email:String,
        password:String
        avatar:String
        posts:[Post],
        createdAt:DateTime,
        updatedAt:DateTime
    },
    type NoteFeed {
        notes: [Post]!
        cursor: String!
        hasNextPage: Boolean!
    },
    type Image {
          id:ID,
          image: String
    },
          
    type Query {
        user(username: String!):User, 
        users: [User!]!
        me: User!,
        post(id:ID!):Post,
        allPosts: [Post],,
        noteFeed(cursor: String): NoteFeed,
        allImages:[Image!]!,
    },
    type Mutation {
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!,
        addPost(title:String!,content:String!):Post,
        editPost(title:String,content:String,id:ID!):Post,
        deletePost(id:ID!):Boolean,
        editUser(username:String!): User,
        singleUpload(file: Upload!): File!
    }
`;
module.exports = typeDefs;