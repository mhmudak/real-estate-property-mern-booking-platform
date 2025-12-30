const { validationResult } = require('express-validator');
const { signupService } = require('../Services/userService');

const signupController = async (req, res) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: errors.array(),
                message: "Validation Error!"
            });
        }
        const { firstname, lastname, email, password, phoneNumber, city } = req.body;
        const response = await signupService(firstname, lastname, email, password, phoneNumber, city);
        res.status(201).json({
            success: true,
            user: response,
            message: "Signup Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Server error!"
        });
    }
}

module.exports = { signupController }