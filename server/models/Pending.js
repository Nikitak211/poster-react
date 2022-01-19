const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Pending = new Schema([{
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}]);

const Pendings = mongoose.model('Pendings', Pending);

module.exports = Pendings;
