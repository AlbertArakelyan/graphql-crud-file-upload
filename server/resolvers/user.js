module.exports = {
    // При запросе разрешается список заметок автора
    // User is parent of notes
    posts: async(user, args, { models }) => {
        return await models.Post.find({ author: user._id }).sort({ _id: -1 });
    }
};