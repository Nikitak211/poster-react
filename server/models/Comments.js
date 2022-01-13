const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Comment = new Schema([{
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
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
}]);

const Comments = mongoose.model('Comment', Comment);

module.exports = Comments;
