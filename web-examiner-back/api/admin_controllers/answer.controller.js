const Answer = require('../models/Answer.model');
const Question = require('../models/Question.model');
const fs = require('fs');
const path = require('path');

module.exports.getAllAnswers = async (req, res, next) => {
    try {
        const answers = await Answer.find();
        res.status(200).json(answers);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.getAnswer = async (req, res, next) => {
    try {
        const answer = await Answer.findById(req.params.id);
        res.status(200).json(answer);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.getAnswers = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        const answers = await Answer.find({ _id: { $in: question.answers } });
        res.status(200).json(answers);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.addAnswer = async (req, res, next) => {
    try {
        let answer = new Answer({
            answer: req.body.answer,
            point: req.body.point,
            parent_question: req.body.parent_question
        });
        if(req.file) {
            answer['answer_img'] = req.file.filename;
        }
        answer = await answer.save();
        const parentQuestion = await Question.findById(req.body.parent_question);
        parentQuestion.answers.push(answer._id);
        await Question.updateOne({ _id: parentQuestion._id }, { $set: { answers: parentQuestion.answers } });
        res.status(200).json(answer);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.updateAnswer = async (req, res, next) => {
    try {
        const setObj = {
            $set: {
                answer: req.body.answer,
                point: req.body.point
            }
        };
        await Answer.updateOne({ _id: req.params.id }, setObj);
        const result = await Answer.findById(req.params.id); 
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};

module.exports.deleteAnswer = async (req, res, next) => {
    try {
        const answer = await Answer.findById(req.params.id);
        const parentQuestion = await Question.findById(answer.parent_question);
        if(parentQuestion) {
            const parentQuestionAnswers = parentQuestion.answers.filter(elem => elem !== req.params.id);
            await Question.updateOne({ _id: parentQuestion._id }, { $set: {answers: parentQuestionAnswers}});
        }
        if(answer.answer_img) {
            const imgLocalPath = path.join(__dirname + `/../../public/images/${answer.answer_img}`);
            fs.unlinkSync(imgLocalPath);
        }
        await Answer.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Successfuly deleted' });
    } catch(err) {
        res.status(500).json({ message: 'Database error' });
    }
};