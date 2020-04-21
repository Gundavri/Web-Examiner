const mongoose = require('mongoose');

const WrittenExamSchema = mongoose.Schema({
    exam_num: {
        type: Number,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: new Date()
    }
});

var WrittenExam = mongoose.model('WrittenExam', WrittenExamSchema);

WrittenExam.collection.dropIndexes((err, res) => {
    if(err) console.log(new Error(err));
});

module.exports = WrittenExam;