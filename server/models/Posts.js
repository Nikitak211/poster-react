const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Post = new Schema([{
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
    status: {
        type: Boolean
    }
}]);

const Posts = mongoose.model('Post', Post);

module.exports = Posts;
