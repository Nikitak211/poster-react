const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Schema creater and models
const Password = new Schema({
    user_id: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: [true, "cannot use this email"],
        required: true
    },
});

module.exports = mongoose.model('Password', Password);
