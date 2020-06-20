const Question = require('../models/Question.model');
const Answer = require('../models/Answer.model');
const User = require('../models/User.model');
const WrittenExam = require('../models/WrittenExam.model');
const sendEmail = require('../middlewares/send_email');
const fs = require('fs');
const path = require('path');
const Exam = require('../models/Exam.model');


let examForUser = {};

module.exports.questionGet = async (req, res, next) => {
    try {
        if(!req.params.id) return res.status(400).json({ message: 'Invalid Parameters' });
        const alreadyWritten = await WrittenExam.findOne({ exam_num: req.params.id, userId: req.userData.userId });
        if(alreadyWritten) return res.status(400).json({ message: 'Exam already written' });
        const exam = await Exam.findOne({exam_num: req.params.id});
        const questionIDs = exam.questions;
        const l = questionIDs.length;
        let numOfQuestions = exam.questions_amount > exam.questions.length ? exam.questions.length : exam.questions_amount;
        let questionSet = new Set();
        let arr = [];
        for(let i = 0; i < numOfQuestions; i++) {
            let randomIndex = Math.floor(Math.random()*l);
            if(questionSet.has(randomIndex)) {
                i--;
                continue;
            }
            questionSet.add(randomIndex);
            arr.push({'_id': questionIDs[randomIndex]});
        }
        if(!examForUser.hasOwnProperty(req.userData.userId)) {
            examForUser[req.userData.userId] = {};
        }
        if(!examForUser[req.userData.userId].hasOwnProperty(req.params.id)){
            examForUser[req.userData.userId][req.params.id] = arr;
        }
        arr = examForUser[req.userData.userId][req.params.id];
        const questions = await Question.find({$or : arr});
        const processedQuestions = await foreachQuestion(questions);
        setTimeout(async () => {
            const alreadyWritten = await WrittenExam.findOne({ exam_num: req.params.id, userId: req.userData.userId });
            if(!alreadyWritten) {
                await WrittenExam.create({
                    exam_num: req.params.id,
                    questions: questions,
                    answers: [],
                    score: 0,
                    userId: req.userData.userId
                });
            }
            const mail = await createMail(alreadyWritten);
            sendEmail.sendEmail(mail).catch((err) => console.log(err));
        }, exam.exam_time * 60 * 1000 + 5000);
        res.status(200).json(processedQuestions);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Database Error'});
    }
}

async function findAnswers(answerIds, question) {
    return new Promise(async (res, rej) => {
        let arr = [];
        let idArr = [];
        for(let i = 0; i < answerIds.length; i++){
            try {
                let answer =  await Answer.findById(answerIds[i]);
                console.log(answer);
                if(answer) {
                    arr.push({
                        answer: answer.answer,
                        answer_img: answer.answer_img
                    });
                    idArr.push(answer._id);
                }
            } catch (error) {
                console.log(error);
                rej(error);
            }
        }
        res({
            "question_id": question._id,
            "question" : question.question,
            "question_img" : question.question_img,
            "answers" : arr,
            "answersIds" : idArr
        });
    });
}

async function foreachQuestion(questions) {
    return new Promise(async (res, rej) => {
        let arr = [];
        for(let i = 0; i < questions.length; i++) {
            try {
                let obj = await findAnswers(questions[i].answers, questions[i]);
                arr.push(obj);
            } catch (error) {
                console.log(error);
                rej(error);
            }
        }
        res(arr);
    })
}

async function createMail(writtenExam) {
    return new Promise(async (res, rej) => {
        try {
            const user = await User.findById(writtenExam.userId);
            const body = await createMailBody(writtenExam);
            const images = await getImages(writtenExam);
            const newObj = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Exam " + writtenExam.exam_num + " results!",
                html: body,
                attachments: images
            }
            res(newObj);
        } catch (error) {
            console.log(error);
            rej(error);
        }
    });
}

async function createMailBody(writtenExam) {
    return new Promise(async (res, rej) => {
        try {
            const usersAns = await getAnswersArrs(writtenExam.answers);
            const questions = await getQuestions(writtenExam.questions);
            const score = writtenExam.score;
            let html = "";
            for(let i = 0; i < questions.length; i++){
                html += "<h3>Qustion N" + (i+1) + ": " + questions[i].question.question;
                html += "</h3><h3>Answers:</h3>";
                for(let j = 0; j < questions[i].answers.length; j++) {
                    html += "<h5>" + questions[i].answers[j].answer + "</h5>";
                }
                html += "<h3>Your answers:</h3>";
                for(let j = 0; j < usersAns[i].length; j++) {
                    html +="<h5>" + usersAns[i][j].answer + "</h5>";
                }
            }
            html += "<h3> Your score: " + score + "</h3>";
            res(html);
        } catch (error) {
            console.log(error);
            rej(error);
        }
    });
}

async function getAnswers(answerIds) {
    return new Promise(async (res, rej) => {
        try {
            let arr = [];
            for(let i = 0; i < answerIds.length; i++) {
                let answer = await Answer.findById(answerIds[i]);
                arr.push({
                    answer: answer.answer,
                    answer_img: answer.answer_img
                });
            }
            res(arr);
        } catch (error) {
            console.log(error);
            rej(error);
        }
    });
}

async function getQuestions(questionIds) {
    return new Promise(async (res, rej) => {
        try {
            let arr = [];
            for(let i = 0; i < questionIds.length; i++) {
                let question = await Question.findById(questionIds[i]);
                let answers = await getAnswers(question.answers);
                arr.push({
                    question: question,
                    answers: answers,
                    img: question.question_img
                });
            }
            res(arr);
        } catch (error) {
            console.log(error);
            rej(error);
        }
    });
}

async function getAnswersArrs(answersIds) {
    return new Promise(async (res, rej) => {
        try {
            let arr = [];
            for(let i = 0; i < answersIds.length; i++) {
                let answers = await getAnswers(answersIds[i]);
                arr.push(answers);
            }
            res(arr);
        } catch (error) {
            console.log(error);
            rej(error);
        }
    });
}

async function getImages(writtenExam) {
    return new Promise(async (res, rej) => {
        try {
            let arr = [];
            const questions = await getQuestions(writtenExam.questions);
            for(let i = 0; i < questions.length; i++) {
                if(questions[i].question.question_img!=='') {
                    const qImg = questions[i].question.question_img;
                    let p = path.join(__dirname, '/../../public/images/' + qImg);
                    let newObj = {
                        filename: "Question" + (i+1) + qImg.substr(qImg.lastIndexOf('.')),
                        content: fs.createReadStream(p)
                    }
                    arr.push(newObj);
                }
                for(let j = 0; j < questions[i].answers.length; j++) {
                    if(questions[i].answers[j].answer_img!=='') {
                        const aImg = questions[i].answers[j].answer_img;
                        let p = path.join(__dirname, '/../../public/images/' + aImg);
                        let newObj = {
                            filename: "Answer" + (i+1) + "-" + (j+1) + aImg.substr(aImg.lastIndexOf('.')),
                            content: fs.createReadStream(p)
                        }
                        arr.push(newObj);
                    }
                }
            }
            res(arr);
        } catch (error) {
            console.log(error);
            rej(error);
        }
    });
}