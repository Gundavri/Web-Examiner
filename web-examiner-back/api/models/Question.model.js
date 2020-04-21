const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    parent_exam_num: {
        type: Number
    },
    question: {
        type: String,
        required: true
    },
    question_img: {
        type: String,
        default: ''
    },
    answers: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Question', questionSchema);