require('dotenv').config();
const connection = require('../../config/db');

function check_user_id(decoded, user_id)
{
    const sql = 'SELECT * FROM user where email=?';

    return new Promise(function(resolve, reject){
        connection.query(sql, [decoded.email], function(err, result){
            if (result[0].id == user_id) {
                resolve();
            } else {
                reject();
            }
        })
    })
}

function check_todo_id(id)
{
    const sql = 'SELECT * FROM todo where id=?';

    return new Promise(function(resolve, reject){
        connection.query(sql, [id], function(err, result){
            if (result != 0) {
                resolve();
            } else {
                reject();
            }
        })
    })
}

function query_todo()
{
    const sql = 'SELECT * FROM todo';

    return new Promise(function(resolve, reject){
        connection.query(sql, function(err, result){
            resolve(result);
        })
    })
}

function query_todo_id(id)
{
    const sql = 'SELECT * FROM todo where id=?';

    return new Promise(function(resolve, reject){
        connection.query(sql, [id], function(err, result){
            resolve(result);
        })
    })
}

function query_todo_post(title, description, due_time, user_id, status)
{
    const insert_todo = `INSERT INTO todo 
    (
        title, description, due_time, user_id, status
    )
    VALUES
    (
        ?, ?, ?, ?, ?
    )`;
    const sql = 'SELECT * FROM todo where title=?';

    return new Promise(function(resolve, reject){
        connection.query(insert_todo, [title, description, due_time, user_id, status], function(err, resu){
            connection.query(sql, [title], function(err, result){
                resolve(result)
            })
        })
    })
}

function query_todo_put(title, description, due_time, user_id, status, id)
{
    const insert_todo = `UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?`;
    const sql = 'SELECT title, description, due_time, user_id, status FROM todo where id=?';

    return new Promise(function(resolve, reject){
        connection.query(insert_todo, [title, description, due_time, user_id, status, id], function(err, resu){
            connection.query(sql, [id], function(err, resul){
                resolve(resul);
            })
        })
    })
}

function query_todo_delete(id)
{
    const sql = 'DELETE FROM todo WHERE id=?';

    return new Promise(function(resolve, reject){
        connection.query(sql, [id], function(err, result){
            resolve();
        })
    })
}

module.exports.query_todo = query_todo;
module.exports.query_todo_id = query_todo_id;
module.exports.query_todo_post = query_todo_post;
module.exports.check_user_id = check_user_id;
module.exports.check_todo_id = check_todo_id;
module.exports.query_todo_put = query_todo_put;
module.exports.query_todo_delete = query_todo_delete;