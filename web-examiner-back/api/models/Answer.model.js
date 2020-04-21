const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    parent_question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        required: true
    },
    answer_img: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Answer', answerSchema);