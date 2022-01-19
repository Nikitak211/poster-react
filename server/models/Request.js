const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Request = new Schema([{
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}]);

const Requests = mongoose.model('Requests', Request);

module.exports = Requests;
