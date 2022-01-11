const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const commentSchema = require('./commentSchema')

const postSchema = new Schema([{
    _id:{
        type: String,
    },
    author: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    avatar: {
        type: String
    },
    date: {
        type: Date
    },
    comments: [ commentSchema.schema ]
}]);

const postdata = mongoose.model('Post', postSchema);

module.exports = postdata;
