const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    title: {
        type: String,
    },
    content: {
        type: String
    },
    author: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
