const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Schema creater and models

const postSchema = require('./postSchema')
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
        password: {
            type: String,
            required: true
        },
        date: {
            type: String
        },
        avatar: {
            type: String
        },
        posts: [ postSchema.schema ]
});

module.exports = mongoose.model('User', userSchema);
