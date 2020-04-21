const path = require('path');
const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Admin = require('./api/models/Admin.model');
const dotenv = require('dotenv');
const cors = require('cors');


// User Route imports
const authRoute = require('./api/routes/auth.route');
const examRoute = require('./api/routes/exam.route');
const questionRoute = require('./api/routes/question.route');
const writtenexamRoute = require('./api/routes/writtenexam.route');

// Admin route imports
const adminAuthRoute = require('./api/admin_routes/adminAuth.route');
const adminExamRoute = require('./api/admin_routes/adminExam.route');
const adminQuestionRoute = require('./api/admin_routes/adminQuestion.route');
const adminAnswerRoute = require('./api/admin_routes/adminAnswer.route');
const adminUserRoute = require('./api/admin_routes/adminUser.route');
const admminWrittenExamRoute = require('./api/admin_routes/adminWrittenExam.route');


mongoose.connect('mongodb://localhost:27017/web_examiner', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, (error) => {
  if(!error) console.log('Connected to DB!');
  else console.log(error);
});

const app = express();

// General purpose middlewares
dotenv.config();
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// User Routes
app.use('/api/auth', authRoute);
app.use('/api/exam', examRoute);
app.use('/api/question', questionRoute);
app.use('/api/writtenexam', writtenexamRoute);

// Admin Routes
app.use('/api/admin/auth', adminAuthRoute);
app.use('/api/admin/exam', adminExamRoute);
app.use('/api/admin/question', adminQuestionRoute);
app.use('/api/admin/answer', adminAnswerRoute);
app.use('/api/admin/user', adminUserRoute);
app.use('/api/admin/writtenexam', admminWrittenExamRoute);

// catch 404 api error and forward to error handler
app.use('/api/*', (req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Static files
app.use(express.static(path.join(__dirname + '/public/images')));
app.use(express.static(path.join(__dirname + '/public/angular-front')));
app.use(express.static(path.join(__dirname + '/public/angular-cms')));
app.use('/image/*', (req, res, next) => {
  const imagePath = path.join(__dirname + `/public/images/${req._parsedOriginalUrl.pathname.substr(7)}`);
  fs.stat(imagePath, (err, stats) => {
    if(err) return res.status(404).json({ message: 'Image not found '});
    res.status(200).sendFile(imagePath)
  });
});

app.get('/admin', (req, res, next) => res.sendFile(path.join(__dirname + '/public/angular-cms/index.html')));
app.get('/admin/*', (req, res, next) => res.sendFile(path.join(__dirname + '/public/angular-cms/index.html')));
app.get('*', (req, res, next) => res.sendFile(path.join(__dirname + '/public/angular-front/index.html')));


module.exports = app;
