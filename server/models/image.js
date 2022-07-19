const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
   image: {
        type: String
   }
}, { timestamps: true });

module.exports = mongoose.model('Image', PostSchema);
