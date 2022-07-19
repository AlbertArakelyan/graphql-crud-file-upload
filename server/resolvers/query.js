const {
   AuthenticationError,
} = require('apollo-server-express');

module.exports = {
   user: async (parent, { username }, { models, user }) => {
      if (!user) {
         throw new AuthenticationError('You must be signed in to get user');
      }
      // Находим пользователя по имени
      return await models.User.findOne({ username });
   },
   users: async (parent, args, { models, user }) => {
      if (!user) {
         throw new AuthenticationError('You must be signed in to get users');
      }
      // Находим всех пользователей
      return await models.User.find({});
   },
   me: async (parent, args, { models, user }) => {
      if (!user) {
         throw new AuthenticationError('You must be signed in to get self info');
      }
      // Находим пользователя по текущему пользовательскому контексту
      return await models.User.findById(user.id);
   },
   post: async (parent, args, { models, user }) => {
      if (!user) {
         console.log(user, 'tuny ov ka?');
         throw new AuthenticationError('You must be signed in to get post');
      }
      const post = await models.Post.findById(args.id);
      return post;
   },
   allImages: async (parent, args, { models, user }) => {
      if (!user) {
         console.log(user, 'tuny ov ka?');
         throw new AuthenticationError('You must be signed in to get post');
      }
      const images = await models.Image.find();
      return images;
   },
   allPosts: async (parent, args, { models, user }) => {
      if (!user) {
         throw new AuthenticationError('You must be signed in to get posts');
      }
      // Находим всех пользователей
      return await models.Post.find({});
   },
   noteFeed: async (parent, { cursor }, { models }) => {
      // Жестко кодируем лимит в 10 элементов
      const limit = 5;
      // Устанавливаем значение false по умолчанию для hasNextPage106   Глава 9. Детали
      let hasNextPage = false;
      // Если курсор передан не будет, то по умолчанию запрос будет пуст
      // В таком случае из БД будут извлечены последние заметки
      let cursorQuery = {};
      // Если курсор задан, запрос будет искать заметки со значением ObjectId
      // меньше этого курсора
      if (cursor) {
         cursorQuery = { _id: { $lt: cursor } };
      }
      // Находим в БД limit + 1 заметок, сортируя их от старых к новым
      let notes = await models.Post.find(cursorQuery)
         .sort({ _id: -1 })
         .limit(limit + 1);
      // Если число найденных заметок превышает limit, устанавливаем
      // hasNextPage как true и обрезаем заметки до лимита
      if (notes.length > limit) {
         hasNextPage = true;
         notes = notes.slice(0, -1);
      }
      // Новым курсором будет ID Mongo-объекта последнего элемента массива списка
      const newCursor = notes[notes.length - 1]._id;
      return {
         notes,
         cursor: newCursor,
         hasNextPage
      };
   }

}