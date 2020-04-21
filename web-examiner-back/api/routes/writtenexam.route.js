const router = require('express').Router();
const checkAuthStudent = require('../middlewares/check_auth_student');
const WrittenExamController = require('../controllers/writtenexam.controller');
const canWriteExam = require('../middlewares/can_write_exam');

router.get('/', checkAuthStudent, WrittenExamController.writtenExamGet)

router.post('/', checkAuthStudent, canWriteExam.checkTimer, WrittenExamController.writtenExamPost);

module.exports = router;