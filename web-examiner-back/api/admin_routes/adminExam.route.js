const router = require('express').Router();
const checkAuthAdmin = require('../middlewares/check_auth_admin');
const ExamController = require('../admin_controllers/exam.controller');

router.get('/', checkAuthAdmin, ExamController.getExams);

router.post('/', checkAuthAdmin, ExamController.addExam);

router.put('/:id', checkAuthAdmin, ExamController.updateExam);

router.delete('/:id', checkAuthAdmin, ExamController.deleteExam);

module.exports = router;