const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const postSchema = new Schema([{
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
    }
}]);

const postdata = mongoose.model('Post', postSchema);

module.exports = postdata;
