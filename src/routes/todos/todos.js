const express = require('express');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const connection = require('../../config/db');
const query = require('./todos.query');

router.get("/", (req, res) => {
    query.query_todo().then(function(result, reject) {
        res.send(result);
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

router.get("/:id", (req, res) => {
    query.query_todo_id(req.params.id).then(function(result, reject) {
        res.send(result);
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

function check_body(req, decoded)
{
    return new Promise(function(resolve, reject){
        if (req.body.title && req.body.description && req.body.due_time) {
            if (req.body.user_id && req.body.status) {
                query.check_user_id(decoded, req.body.user_id).then(function(result){
                    resolve();
                }).catch((err) => {
                    reject();
                })
            } else {
                reject();
            }
        } else {
            reject();
        }
    })
}

router.post("/", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const user_id = req.body.user_id;
    const status = req.body.status;

    check_body(req, res.locals.decoded).then(function(result, reject) {
        query.query_todo_post(title, description, due_time, user_id, status).then(function(result, reject) {
            res.send(result);
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

router.put("/:id", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const due_time = req.body.due_time;
    const user_id = req.body.user_id;
    const status = req.body.status;

    check_body(req, res.locals.decoded).then(function(result, reject) {
        query.check_todo_id(req.params.id).then(function(result_todo){
            query.query_todo_put(title, description, due_time, user_id, status, req.params.id).then(function(result, reject) {
                res.send(result);
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
    }).catch((err) => {
        return res.status(500).json({
            msg: "internal server error"
        });
    })
})

router.delete("/:id", (req, res) => {
    query.check_todo_id(req.params.id).then(function(result_todo){
        query.query_todo_delete(req.params.id).then(function(result, reject) {
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