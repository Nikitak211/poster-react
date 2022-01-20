const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Pending = new Schema([{
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

const Pendings = mongoose.model('Pendings', Pending);

module.exports = Pendings;
