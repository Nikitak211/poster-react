const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Schema creater and models
const userSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "cannot use this email"],
        required: true
    },
    date: {
        type: String
    },
    avatar: {
        type: String
    },
    status: {
        type: Boolean
    }
});

module.exports = mongoose.model('User', userSchema);
