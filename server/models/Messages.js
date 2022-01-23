const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Schema creater and models

const Messages = new Schema({
    chat_room: {
        type: String
    },
    messages: [{
        from: {
            user: {
                _id: Schema.Types.ObjectId,
                ref: 'User'
            },
            message: {
                type: String
            }
        },
        to: {
            user: {
                _id: Schema.Types.ObjectId,
                ref: 'User'
            },
            message: {
                type: String
            }
        }
    }]
});

module.exports = mongoose.model('Messages', Messages);
