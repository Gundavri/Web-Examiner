const router = require('express').Router();
const AnswerController = require('../admin_controllers/answer.controller');
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


router.get('/', checkAuthAdmin, AnswerController.getAllAnswers);

router.get('/single/:id', checkAuthAdmin, AnswerController.getAnswer);

router.get('/:id', checkAuthAdmin, AnswerController.getAnswers);

router.post('/', checkAuthAdmin, upload.single('answer_img'), AnswerController.addAnswer);

router.put('/:id', checkAuthAdmin, AnswerController.updateAnswer);

router.delete('/:id', checkAuthAdmin, AnswerController.deleteAnswer);

module.exports = router;