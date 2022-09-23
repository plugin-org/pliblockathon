require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//********* GET ROUTES ************//
// const data = {
//     email: 'dharan731@gmail.com',
//     password: 'sasidharan',
// };
router.post('/', jsonParser, async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if (!user) {
        return res.json({
            status: 'error',
            error: 'Invalid username/password',
        });
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            process.env.ACCESS_TOKEN_VERIFICATION
        );

        if (!user.confirmed) {
            return res.json({
                status: 'error',
                id: user._id,
                message: 'User not confirmed',
            });
        } else {
            return res.json({ status: 'ok', token: token });
        }
    }

    res.json({ status: 'error', error: 'Invalid username/password' });
});

router.get('/protected', verifyToken, (req, res) => {
    jwt.verify(
        req.token,
        process.env.ACCESS_TOKEN_VERIFICATION,
        (err, authData) => {
            if (!err) {
                User.findById(authData.id).then((data) => {
                    res.json(data);
                });
            } else {
                res.sendStatus(403);
            }
        }
    );
});

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = router;
