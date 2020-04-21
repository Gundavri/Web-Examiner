const router = require('express').Router();
const QuestionController = require('../controllers/question.controller');
const checkAuthStudent = require('../middlewares/check_auth_student');
const canWriteExam = require('../middlewares/can_write_exam');

router.get('/:id', checkAuthStudent, canWriteExam.startTimer, QuestionController.questionGet);

router.get('/time/:id', checkAuthStudent, canWriteExam.getTimer);

module.exports = router;

