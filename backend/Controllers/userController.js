const { validationResult } = require('express-validator');
const { signupService } = require('../Services/userService');

const signupController = (req, res) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array([0]),
                message: "Validation Error!"
            })
        }
        const { username, password, firstname, lastname, email } = req.body;
        const response = signupService(username, password, firstname, lastname, email);
        res.status(201).json({
            success: true,
            data: response,
            message: "Signup Successfully!"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            data: err.message,
            message: "Server error!"
        });
    }
}

module.exports = { signupController }