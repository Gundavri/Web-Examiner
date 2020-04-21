const router = require('express').Router();
const QuestionController = require('../admin_controllers/question.controller');
const checkAuthAdmin = require('../middlewares/check_auth_admin');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

router.get('/', checkAuthAdmin, QuestionController.getAllQuestions);

router.get('/single/:id', checkAuthAdmin, QuestionController.getQuestion);

router.get('/:id', checkAuthAdmin, QuestionController.getQuestions);

router.post('/', checkAuthAdmin, upload.single('question_img'), QuestionController.addQuestion);

router.put('/:id', checkAuthAdmin, QuestionController.updateQuestion);

router.delete('/:id', checkAuthAdmin, QuestionController.deleteQuestion);

module.exports = router;
