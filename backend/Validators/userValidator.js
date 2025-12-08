const { check } = require('express-validator')

const signupValidator = [
    check('username')
        .notEmpty().withMessage('Username cant be Empty')
        .isAlphanumeric().withMessage('Username should contain letters and numbers.'),

    check('firstname')
        .notEmpty().withMessage('First Name cant be empty'),

    check('lastname')
        .notEmpty().withMessage('Last Name cant be EMpty.'),

    check('password')
        .notEmpty().withMessage('Password cant be empty')
        .isStrongPassword().withMessage('Use combination of at least 1 lowercase, 1 uppercase, ..'),

    check('email')
        .notEmpty().withMessage('Email cant be Empty')
        .isEmail().withMessage('Not valid format')
]

module.exports = {signupValidator}