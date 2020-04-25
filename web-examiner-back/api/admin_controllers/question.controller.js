const fs = require('fs');
const path = require('path');
const Exam = require('../models/Exam.model');
const Question = require('../models/Question.model');
const Answer = require('../models/Answer.model');


module.exports.getAllQuestions = async (req, res, next) => {
    // await Exam.deleteMany();
    // await Question.deleteMany();
    // await Answer.deleteMany();
    try {
        const question = await Question.find();
        res.status(200).json(question);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.getQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        res.status(200).json(question);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.getQuestions = async (req, res, next) => {
    try {
        const exam = await Exam.findOne({ exam_num: req.params.id });
        const questions = await Question.find({ _id: { $in: exam.questions }});
        res.status(200).json(questions);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.addQuestion = async (req, res, next) => {
    try {
        let newQuestion = new Question({
            parent_exam_num: req.body.parent_exam_num,
            question: req.body.question
        });
        if(req.file) {
            newQuestion['question_img'] = req.file.filename;
        }
        const question = await newQuestion.save();
        if(req.body.parent_exam_num) {
            const parentExam = await Exam.findOne({ exam_num: req.body.parent_exam_num });
            if(parentExam) {
                parentExam.questions.push(question._id);
                await Exam.updateOne({ _id: parentExam._id }, { $set: { questions: parentExam.questions } });
            }
        }
        res.status(200).json(question);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.updateQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        let setObj = { 
            $set: {
                question: req.body.question
            } 
        };
        if(req.body.parent_exam_num && question.parent_exam_num !== req.body.parent_exam_num) {
            let oldExam = await Exam.findOne({ exam_num: question.parent_exam_num });
            if(oldExam) {
                oldExam.questions = oldExam.questions.filter(q => JSON.stringify(q) !== JSON.stringify(question._id));
                await Exam.updateOne({ exam_num: question.parent_exam_num }, { $set: { questions: oldExam.questions }});
            }
            let newExam = await Exam.findOne({ exam_num: req.body.parent_exam_num});
            if(newExam) {
                newExam.questions.push(req.params.id);
                await Exam.updateOne({ exam_num: req.body.parent_exam_num}, { $set: { questions: newExam.questions } });
            }
            setObj.$set.parent_exam_num = req.body.parent_exam_num;
        }
        await Question.updateOne({ _id: req.params.id }, setObj);
        res.status(200).json({ message: 'Successfuly updated'} );
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if(question.parent_exam_num) {
            const parentExam = await Exam.findOne({ exam_num: question.parent_exam_num });
            if(parentExam) {
                const parentExamQuestions = parentExam.questions.filter(elem => elem != req.params.id);
                await Exam.updateOne({ _id: parentExam._id }, { $set: { questions: parentExamQuestions } });
            }
        }
        for(let i=0; i<question.answers.length; i++) {
            const ans = await Answer.findById(question.answers[i]);
            if(ans.answer_img) {
                const imgLocalPath = path.join(__dirname + `/../../public/images/${ans.answer_img}`);
                fs.unlinkSync(imgLocalPath);
            }
            await Answer.deleteOne({ _id: question.answers[i] });
        }
        if(question.question_img) {
            const imgLocalPath = path.join(__dirname + `/../../public/images/${question.question_img}`);
            fs.unlinkSync(imgLocalPath);
        }
        await Question.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Successfuly deleted' });
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};