module.exports = {
  // При запросе разрешается список заметок автора
  // Post is parent of user
  author: async (parent, args, { models }) => {
    const author = await models.User.findById(parent.author);
    return author;
  }
};
