const express = require('express');
const router = express.Router();
const connection = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

function mail_exist(mail) {
    const getEmails = 'SELECT email FROM user WHERE `email` = ?';
    return new Promise(function(resolve, reject){
        connection.query(
            getEmails,
            [mail],
            function (err, result) {
                if (err) throw err;
                if (result != 0) {
                    resolve(1);
                }
                else {
                    resolve(0);
                }
            }
        );
    })
}

router.post("/register", (req, res) => {
    const mail = req.body.email;
    const name = req.body.name;
    const firstname = req.body.firstname;
    const pass = req.body.password;
    const token = jwt.sign(req.body, process.env.SECRET);
    let email_exist = null;
    const insert_user = `INSERT INTO user 
            (
                email, password, name, firstname
            )
            VALUES
            (
                ?, ?, ?, ?
            )`;
    if (mail && name && firstname && pass) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt)
        mail_exist(mail)
        .then(function(result){
            email_exist = result;
            if (email_exist == 0) {
                connection.query(
                    insert_user,
                    [mail, hash, name, firstname]
                );
                return res.json({
                    token: token
                });
            }
            else {
                return res.status(400).json({
                    msg: "account already exists"
                });
            }
        })
    }
    else {
        return res.status(400).json({
            error: "enter valid credentials"
        })
    }
})

router.post("/login", (req, res) => {
    const mail = req.body.email;
    const pass = req.body.password;
    const sql = 'SELECT email, password FROM user WHERE email = ?'
    if (mail && pass) {
        connection.query(sql, [mail], function(error, results) {
            if (results != 0) {
                const hash = results[0].password;
                const pass_match = bcrypt.compareSync(pass, hash);
                if (pass_match == true) {
                    const token = jwt.sign(req.body, process.env.SECRET);
                    res.setHeader('Content-Type', 'application/json');
                    res.setHeader('Authorization', 'Bearer ' + token);
                    return res.json({
                        token: token
                    })
                }
                else {
                    return res.status(400).json({
                        msg: "Invalid Credentials"
                    })
                }
            }
            else {
                return res.status(400).json({
                    msg: "Invalid Credentials"
                })
            }       
        });
    }
    else {
        return res.status(400).json({
            error: "enter valid credentials"
        })
    }
})

module.exports = router;