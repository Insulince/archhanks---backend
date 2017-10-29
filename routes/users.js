const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post(
    '/register',
    (req, res) => {
        let newUser = new User(
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                basalRate: req.body.basalRate,
                carbohydrateRatio: req.body.carbohydrateRatio,
                correctionRatio: req.body.correctionRatio,
                targetBloodSugar: req.body.targetBloodSugar,
                insulinOnBoardDuration: req.body.insulinOnBoardDuration
            }
        );

        User.addUser(
            newUser,
            (error) => {
                if (error) {
                    console.log(error);
                    res.json(
                        {
                            success: false,
                            msg: 'Failed to register user'
                        }
                    );
                } else {
                    res.json(
                        {
                            success: true,
                            msg: 'User registered'
                        }
                    );
                }
            }
        );
    }
);

router.post(
    "/login",
    (req, res) => {
        let credentials = {
            username: req.body.username,
            password: req.body.password
        };

        User.login(
            credentials,
            (error, user) => {
                if (error) {
                    console.log(error);
                    res.json(
                        {
                            success: false,
                            msg: 'Failed to login user: Error'
                        }
                    );
                } else if (user === null) {
                    res.json(
                        {
                            success: false,
                            msg: 'Failed to login user: Invalid credentials'
                        }
                    );
                } else {
                    res.json(
                        {
                            success: true,
                            msg: 'User logged in',
                            user: user
                        }
                    );
                }
            }
        );
    }
);

module.exports = router;