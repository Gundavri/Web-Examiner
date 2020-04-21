const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const checkAuthStudent = require('../middlewares/check_auth_student');


router.get('/valid', checkAuthStudent, AuthController.userTokenValid);

router.post('/login', AuthController.userLogin);

router.post('/register', AuthController.userRegister);


module.exports = router;