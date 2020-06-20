const Exam = require('../models/Exam.model');
const WrittenExam = require('../models/WrittenExam.model');
const Question = require('../models/Question.model');
const User = require('../models/User.model');

module.exports.getExams = async (req, res, next) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.addExam = async (req, res, next) => {
    try {
        const exam = await Exam.create({
            exam_num: req.body.exam_num
        });
        res.status(200).json(exam);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.updateExam = async (req, res, next) => {
    try {
        let setObj = { 
            $set: {
                is_active: req.body.is_active,
            }
        };
        if(req.body.is_active) {
            setObj.$set.exam_time = req.body.exam_time;
            setObj.$set.questions_amount = req.body.questions_amount;
        }
        await Exam.updateOne({ _id: req.params.id }, setObj);
        res.status(200).json({ message: 'Successfuly updated'} );
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.deleteExam = async (req, res, next) => {
    try {
        const exam = await Exam.findById(req.params.id);
        const writtenExams = await WrittenExam.find({exam_num: exam.exam_num});
        for(let i=0; i<writtenExams.length; i++) {
            let user = await User.findById(writtenExams[i].userId);
            user.exams_written = user.exams_written.filter(ew => ew !== writtenExams[i]._id);
            await User.updateOne({ exams_written: user.exams_written });
        }
        for(let i=0; i<exam.questions.length; i++) {
            await Question.updateOne({ _id: exam.questions[i] }, { $set: { parent_exam_num: 0} });
        }
        await Exam.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Successfuly deleted' });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
}