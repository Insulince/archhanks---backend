const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        basalRate: req.body.fname,
        carbRatio: req.body.lname,
        correctionRatio: req.body.role,
        IOBDuration: req.body.major
    });
    newUser.save();
});

//Authentication
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.json({
                success: false, 
                msg: 'User not found'
            });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 1800 //30 minutes
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        username: user.username,
                        basalRate: user.basalRate,
                        carbRatio: user.carbRatio,
                        correctionRatio: user.correctionRatio,
                        IOBDuration: user.IOBDuration
                    }
                });
            } else {
                return res.json({
                    success: false, 
                    msg: 'Wrong password'
                });
            }
        });
    });
});

module.exports = router;