const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    username: {
        type: String,
        minLength: 2,
        required:true
    },
    email: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UserSchema);
