const jwt = require('jsonwebtoken');
const { loginUser } = require('../Services/authService');
const { validationResult } = require('express-validator');

const loginController = async (req, res) => {
    // validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array(),
            message: "Validation Error!"
        });
    }

    try {
        const { email, password } = req.body;

        // Authenticate
        const user = await loginUser(email, password);

        // create JWT token = id, secret key, expire time
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // set cookie
        res.cookie('token', token, {
            httpOnly: true, // prevent client side access - client can't read this cookie
            sameSite: 'Strict', // prevent another site to send requests
            maxAge: 60 * 60 * 1000 * 24, // milliseconds
            secured: false // http - true if https
        });

        res.status(200).json({
            success: true,
            message: "User loggin in Successfully!",
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Login failed!"
        });
    }
}

module.exports = { loginController }