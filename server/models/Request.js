const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema creater and models
const Request = new Schema([{
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

const Requests = mongoose.model('Requests', Request);

module.exports = Requests;
