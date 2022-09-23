require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

router.get('/:token', async (req, res) => {
    try {
        const data = jwt.verify(
            req.params.token,
            process.env.ACCESS_TOKEN_VERIFICATION
        );

        User.findByIdAndUpdate(data.id, {
            $set: {
                confirmed: true,
            },
        }).then((data) => {
            res.json(data);
        });
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
