const Query = require('./query');
const Mutation = require('./mutation');
const User = require('./user');
const Post = require('./post');

const { GraphQLDateTime } = require('graphql-iso-date');
const { GraphQLUpload } = require('graphql-upload');




module.exports = {
    Query,
    Upload: GraphQLUpload,
    Mutation,
    User,
    Post,
    DateTime: GraphQLDateTime
}