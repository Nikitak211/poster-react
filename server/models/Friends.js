const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Friend = new Schema([{
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }
}]);

const Friends = mongoose.model('Friends', Friend);

module.exports = Friends;
