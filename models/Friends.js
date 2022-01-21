const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Friend = new Schema([{
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fromName:{
        type: String
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    toName:{
        type: String
    }
}]);

const Friends = mongoose.model('Friends', Friend);

module.exports = Friends;
