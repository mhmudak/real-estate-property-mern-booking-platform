const express = require('express');
const { signupController } = require('../Controllers/userController');
const { loginController } = require('../Controllers/authController');
const { signupValidator, loginValidator } = require('../Validators/userValidator');
const router = express.Router();

router.post('/signup', signupValidator, signupController);
router.post('/login', loginValidator, loginController);

module.exports = router;