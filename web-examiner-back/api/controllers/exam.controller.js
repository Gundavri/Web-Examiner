const Exam = require('../models/Exam.model');
const WrittenExam = require('../models/WrittenExam.model');


module.exports.examsGet = (req, res, next) => {
    Exam.find().then(async (exams) => {
        const arr = exams.map(e => {
            return {
                _id: e._id,
                exam_num: e.exam_num,
                is_active: e.is_active
            };
        });
        res.status(200).json(arr);
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: 'Database Error'});
    });
}
