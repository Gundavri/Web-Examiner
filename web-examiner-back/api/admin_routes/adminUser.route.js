const router = require('express').Router();
const checkAuthAdmin = require('../middlewares/check_auth_admin');
const UserController = require('../admin_controllers/user.controller');

router.get('/', checkAuthAdmin, UserController.getUsers);

router.delete('/:id', checkAuthAdmin, UserController.deleteUser);

module.exports = router;