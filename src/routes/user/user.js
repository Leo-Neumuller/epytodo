const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const query = require('./user.query');

function check_body(req)
{
    return new Promise(function(resolve, reject){
        if (req.body.email && req.body.password && req.body.firstname && req.body.name) {
            resolve();
        } else {
            reject();
        }
    })
}

router.get("/", (req, res) => {
    query.query_user().then(function(result, reject) {
        res.send(result);
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

router.get("/todos", (req, res) => {
    query.query_todos(res.locals.decoded.email).then(function(result, reject) {
        res.send(result);
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

router.get("/:id", (req, res, next) => {
    const checkemail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (checkemail.test(String(req.params.id).toLowerCase()) == true) {
        return next();
    }
    query.query_id(req.params.id).then(function(result, reject) {
        res.send(result);
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

router.get("/:email", (req, res) => {
    query.query_email(req.params.email).then(function(result, reject) {
        res.send(result);
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

router.put("/:id", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const name = req.body.name;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    check_body(req).then(function(result, reject) {
        query.check_id(req.params.id).then(function(result){
            query.query_user_put(email, hash, firstname, name, req.params.id).then(function(result, reject) {
                res.send(result);
            }).catch((err) => {
                return res.status(500).json({
                    msg: "internal server error"
                });
            })
        }).catch((err) => {
            return res.status(500).json({
                msg: "internal server errorrrr"
            });
        })
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

router.delete("/:id", (req, res) => {
    query.check_id(req.params.id).then(function(result){
        query.query_id_delete(req.params.id).then(function(result, reject) {
            return res.json({
                "msg": "succesfully deleted record number: " + req.params.id
            })
        }).catch((err) => {
            return res.status(500).json({
                msg: "internal server error"
            });
        })
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

module.exports = router;