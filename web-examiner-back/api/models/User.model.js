const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 32
    },
    password: {
        type: String,
        required: true
    },
    exams_written: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);