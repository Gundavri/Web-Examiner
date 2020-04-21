const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
    exam_num: {
        type: Number,
        required: true,
        unique: true
    },
    questions: {
        type: Array,
        default: []
    },
    is_active: {
        type: Boolean,
        default: false
    },
    exam_time: {
        type: Number,
        default: 15
    },
    questions_amount: {
        type: Number,
        default: 10
    }
});

module.exports = mongoose.model('Exam', examSchema);