const router = require('express').Router();
const checkAuthAdmin = require('../middlewares/check_auth_admin');
const WrittenExamController = require('../admin_controllers/writtenExam.controller');

router.get('/', checkAuthAdmin, WrittenExamController.getAllWrittenExams);

router.delete('/:id', checkAuthAdmin, WrittenExamController.deleteWrittenExam);

module.exports = router;