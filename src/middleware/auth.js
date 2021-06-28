const express = require('express');
var router = express.Router();
const authRouter = require('../routes/auth/auth');
const jwt = require('jsonwebtoken');

function check_jwt(req, res, next)
{
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];   
        jwt.verify(token, process.env.SECRET, function(err, decoded){
            if (err) {
                return res.status(400).json({
                    "msg": "Token is not valid"
                })
            } else {
                res.locals.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(400).json({
            error: "No token , authorization denied"
        })
    }
}

router.use('/todo', function (req, res, next) {
    check_jwt(req, res, next);
});

router.use('/user', function (req, res, next) {
    check_jwt(req, res, next);
});

router.use('/login', function (req, res, next) {
    next();
});

router.use('/register', function (req, res, next) {
    next();
});

router.use('/', authRouter);

module.exports = router;