const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token
            token = req.headers.authorization.split(' ')[1];

            // Verify
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.userId = decoded;

            next();
        } catch (error) {
            // Unauth status
            res.sendStatus(401);
        }
    }

    if (!token) {
        res.sendStatus(401);
    }
}

module.exports = { protect };
