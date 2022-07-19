import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  uri: 'http://localhost:3005/api',
  link: createUploadLink({
    uri: "http://localhost:3005/api",
  }),
  cache: new InMemoryCache(),
});

export default client;