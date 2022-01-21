const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Like = new Schema([{
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Comments'
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }
}]);

const Likes = mongoose.model('Likes', Like);

module.exports = Likes;
