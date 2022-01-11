const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models

const commentSchema = new Schema([{
    author: {
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

const commentdata = mongoose.model('Comment', commentSchema);

module.exports = commentdata;
