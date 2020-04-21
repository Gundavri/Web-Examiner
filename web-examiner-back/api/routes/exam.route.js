const router = require('express').Router();
const ExamController = require('../controllers/exam.controller');
const checkAuthStudent = require('../middlewares/check_auth_student');

router.get('/', checkAuthStudent, ExamController.examsGet);

module.exports = router;

