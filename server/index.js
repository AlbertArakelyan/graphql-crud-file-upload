const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const {
    graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const typeDefs = require('./schema/schema');
const models = require('./models/index');
const resolvers = require('./resolvers/index');
const PORT = 3005;
require('./db'); // Initialize the DB connectionx
const app = express();
app.use(helmet());
app.use(cors());
app.use(graphqlUploadExpress());


// Получаем информацию пользователя из JWT
const getUser = token => {
    if (token) {
        try {
            // Возвращаем информацию пользователя из токена
            return jwt.verify(token, 'mysecret123456789');
        } catch (err) {
            // Если с токеном возникла проблема, выбрасываем ошибку
            new Error('Session invalid');
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Получаем токен пользователя из заголовков
        const token = req.headers.authorization;
        // Пытаемся извлечь пользователя с помощью токена
        const user = getUser(token);
        // Добавляем модели БД и пользователя в контекст
        return { models, user };
    }
});

app.listen(PORT, async() => {
    await server.start();
    server.applyMiddleware({ app, path: '/api' });
    console.log(`GraphQL Server running at http://localhost:${PORT}${server.graphqlPath}`)
});