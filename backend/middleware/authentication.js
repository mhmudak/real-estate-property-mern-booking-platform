const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token Provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // go to controller       
    } catch (error) {
        res.status(403).json({  // 403 - error for validaiton
            success: false,
            error: error.message,
            message: "Invalid or expired token"
        });
    }
}

module.exports = authenticateToken;