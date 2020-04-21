const router = require('express').Router();
const AuthController = require('../admin_controllers/auth.controller');
const checkAuthAdmin = require('../middlewares/check_auth_admin');


router.get('/valid', checkAuthAdmin, AuthController.adminTokenValid);

router.post('/login', AuthController.adminLogin);


module.exports = router;