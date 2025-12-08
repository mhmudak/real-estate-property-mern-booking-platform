const express = require('express');
const { signupController } = require('../Controllers/userController');
const { signupValidator } = require('../Validators/userValidator');
const router =  express.Router();

router.post('/signup', signupValidator, signupController);

module.exports = router;