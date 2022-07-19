const models = require('../models/index');
 const bcrypt = require('bcrypt');
const gravatar = require('../utils/gavatar');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');

const path = require('path');
const {
    GraphQLUpload,
    graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
// const { finished } = require('stream/promises');


module.exports = {
    signUp: async(parent, { username, email, password }, { models }) => {
        // Нормализуем имейл
        email = email.trim().toLowerCase();
        // Хешируем пароль
        const hashed = await bcrypt.hash(password, 10);
        // Создаем url gravatar-изображения
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                password: hashed
            });
            // Создаем и возвращаем json web token
            console.log(user)
            return jwt.sign({ id: user._id }, 'mysecret123456789');
        } catch (err) {
            console.log(err);
            // Если при регистрации возникла проблема, выбрасываем ошибку
            throw new Error('Error creating account');
        }
    },
    signIn: async(parent, { username, email, password }, { models }) => {
        if (email) {
            // Нормализуем e-mail
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        });
        // Если пользователь не найден, выбрасываем ошибку аутентификации
        if (!user) {
            throw new AuthenticationError('Error signing in');
        }
        // Если пароли не совпадают, выбрасываем ошибку аутентификации
        const valid = await
        bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Error signing in');
        }
        // Создаем и возвращаем json web token
        return jwt.sign({ id: user._id }, 'mysecret123456789');
    },
    addPost: async(parent, { content, title }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }
        try {
            return await models.Post.create({
                content,
                title,
                // Ссылаемся на mongo id автора
                author: mongoose.Types.ObjectId(user.id)
            });
        } catch (e) {
            return false;
        }
    },
    editPost: async(parent, { id, content, title }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to edit a post');
        }
        // Находим заметку
        const post = await models.Post.findById(id);
        // Если владелец заметки и текущий пользователь не совпадают, выбрасываем
        // запрет на действие
        if (post && String(post.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions");
        }
        try {
            // Обновляем заметку в БД и возвращаем ее в обновленном виде
            return await models.Post.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    content,
                    title
                }
            }, {
                new: true
            });
        } catch (e) {
            return false;
        }
    },
    deletePost: async(parent, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a post');
        }
        try {
            // Обновляем заметку в БД и возвращаем ее в обновленном виде
            const post = await models.Post.findById(id);
            // Если владелец заметки и текущий пользователь не совпадают, выбрасываем
            // запрет на действие
            if (post && String(post.author) !== user.id) {
                throw new ForbiddenError("You don't have permissions to delete the post");
            }
            try {
                // Если все проверки проходят, удаляем заметку
                await post.remove();
                return true;
            } catch (err) {
                // Если в процессе возникает ошибка, возвращаем false
                return false;
            }

        } catch (e) {
            return false;
        }
    },
    editUser: async(parent, { username }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to change your info');
        }
        try {
            console.log('user --->', user);
            return await models.User.findOneAndUpdate({
                _id: user.id
            }, {
                $set: {
                    username
                }
            }, {
                new: true
            });

        } catch (e) {
            return false;
        }
    },
    singleUpload: async(parent, { file }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;

        const uploadDir = path.resolve(__dirname + '/../../client/src/images') ;
        const extName = filename.split('.')[1];
        const fileName = filename.split('.')[0];
        const randomInt = Date.now();

        const pathToImg = `${uploadDir}/${fileName}${randomInt}.${extName}`;
        const imgName = `${fileName}${randomInt}.${extName}`;
        console.log(extName);
        console.log(pathToImg)

        const stream = createReadStream();

        const out = require('fs').createWriteStream(pathToImg);
        stream.pipe(out)
            .on('finish', async(file) => {
                await models.Image.create({
                    image: pathToImg,
                });
                console.log('file is uploaded');
            })
            .on('error', error => {
                console.log(error);
            })


        return { filename: pathToImg, mimetype, encoding, imgName };
    },
};