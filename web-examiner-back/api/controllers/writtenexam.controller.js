const WrittenExam = require("../models/WrittenExam.model");
const User = require('../models/User.model');
const Answer = require("../models/Answer.model");
const canWriteExam = require('../middlewares/can_write_exam');

module.exports.writtenExamGet = async (req, res, next) => {
    try {
        const writtenExams = await WrittenExam.find({ userId: req.userData.userId });
        const arr = writtenExams.map(wx => {
            return {
                _id: wx._id,
                exam_num: wx.exam_num,
                score: wx.score
            };
        });
        res.status(200).json(arr);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
}

module.exports.writtenExamPost = async (req, res, next) => {
    try {
        const alreadyWritten = await WrittenExam.findOne({ exam_num: req.body.exam_num, userId: req.userData.userId });
        if(alreadyWritten) return res.status(400).json({ message: 'Exam already written' });
        let score = await getScore(req.body.writtenExam.answers);
        let newObj = await new WrittenExam({
            exam_num: req.body.writtenExam.exam_num,
            questions: req.body.writtenExam.questions,
            answers: req.body.writtenExam.answers,
            score: score,
            userId: req.userData.userId
        }).save();
        let {exams_written} = await User.findById(req.userData.userId);
        exams_written.push(newObj._id);
        await User.updateOne({ _id: req.userData.userId }, { $set: {exams_written} });
        canWriteExam.deleteUser(req.userData.userId, req.body.exam_num);
        res.status(200).json(newObj);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function getScore(answers) {
    return new Promise(async (res, rej) => {
        let score = 0;
        for(let i = 0; i < answers.length; i++) {
            for(let j = 0; j < answers[i].length; j++) {
                try {
                    let tmp = await Answer.findById(answers[i][j]);
                    score += tmp.point;
                } catch (error) {
                    rej(error);
                }
            }
        }
        res(score);
    });
}