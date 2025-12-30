const { check } = require('express-validator')

const signupValidator = [
    check('firstname')
        .notEmpty().withMessage('First Name cant be empty'),

    check('lastname')
        .notEmpty().withMessage('Last Name cant be EMpty.'),

    check('password')
        .notEmpty().withMessage('Password cant be empty')
        .isStrongPassword().withMessage('Use combination of at least 1 lowercase, 1 uppercase, 1 digit number, and a symbol.'),

    check('email')
        .notEmpty().withMessage('Email cant be Empty')
        .isEmail().withMessage('Not valid format'),

    check('phoneNumber')
        .notEmpty().withMessage('Phone number is required')
        .matches(/^\+?[1-9]\d{1,14}$/)
        .withMessage('Invalid phone number format. Use international format (e.g., +1234567890)'),

    // check('city')
    //     .notEmpty().withMessage('City cant be EMpty.'),
]

const loginValidator = [
    check('email')
        .notEmpty().withMessage('Email cant be empty.')
        .isEmail().withMessage('Invalid EMail format'),

    check('password')
        .notEmpty().withMessage('Password is required!')
]

module.exports = { signupValidator, loginValidator }