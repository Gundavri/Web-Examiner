const readline = require("readline");
const Answer = require("../models/Answer.model");
const Exam = require("../models/Exam.model");
const Question = require("../models/Question.model");
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/web_examiner', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, (error) => {
  if(!error) ;
  else console.log(error);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let exam_num;
let questions = [];
let answers = [];
let answersToAdd = [];
let questionN = 1;
let answerN = 1;

function askForQuestion(question) {
    if(question === '') {
        questionN--;
        return rl.question("Enter answer N" + answerN++ + ": ", askForAnswer);
    }
    questions.push(question);
    rl.question("Enter question N" + questionN++ + ": ", askForQuestion);
}

function askForAnswer(answer) {
    if(answer === '') {
        answerN = 1;
        questionN--;
        answers.push(answersToAdd);
        answersToAdd = [];
    } else {
        answersToAdd.push(answer);
    }
    if(questionN === 1) {
        addToDB(exam_num, questions, answers);
        return rl.close();
    }
    rl.question("Enter answer N" + answerN++ + ": ", askForAnswer);
}

rl.question("Enter num of exam: ", (num) => {
    exam_num = num;
    rl.question("Enter question N" + questionN++ + ": ", askForQuestion);
})

async function addToDB(exam_num, questions, answers) {
    answers = await addAnswersToDB(answers);
    questions = await addQuestionsToDB(questions, answers);
    addExamToDB(exam_num, questions);
}

async function addAnswersToDB(answrs) {
    return await newFun(answrs);
}

async function newFun(answrs) {
    return new Promise(async (res, rej) => {
       let arr = [];
       for(let i = 0; i < answrs.length; i++) {
           try {
               const newObjs = await newFun1(answrs[i]);
               arr.push(newObjs);
           } catch(error) {
               console.log(error);
               rej(error);
           }
       }
       res(arr);
    });
}

async function newFun1(ans) {
    return new Promise(async (res, rej) => {
        let arrToAdd = [];
        for(let i = 0; i < ans.length; i++) {
            let lastSpace = ans[i].lastIndexOf(' ');
            let points = parseFloat(ans[i].substring(lastSpace+1));
            let text = ans[i].substring(0, lastSpace);
            try {
                let newObj = await new Answer({
                    "answer" : text,
                    "point" : points
                }).save();
                arrToAdd.push(newObj); 
            } catch(error) {
                console.log(error);
                rej(error);
            }
        }
        res(arrToAdd);
    });
}

async function addQuestionsToDB(questins, anws) {
    return await newFun2(questins, anws);
}

async function newFun2(questions, anws) {
    return new Promise(async (res, rej) => {
        let arr = [];
        for(let i = 0; i < questions.length; i++) {
            let answArr = [];
            anws[i].forEach(anw => {
                answArr.push(anw._id);
            });
            try {
                let newObj = await new Question({
                    "question" : questions[i],
                    "answers" : answArr
                }).save()
                arr.push(newObj);
            } catch (error) {
                console.log(error);
                rej(error);
            }
        }
        res(arr);
    });
}

async function addExamToDB(num, qusts) {
    let qArr = [];
    qusts.forEach(question => {
        qArr.push(question._id);
    });
    return await new Exam({
        "exam_num" : num,
        "questions" : qArr
    }).save();
}

// Exam.find().then(exam => console.log(exam))
// Question.find().then(questions => console.log(questions));
// Answer.find().then(answers => console.log(answers));

