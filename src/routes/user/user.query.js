require('dotenv').config();
const connection = require('../../config/db');

function check_id(id)
{
    const sql = 'SELECT * FROM user WHERE id=?';

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

function query_user()
{
    const sql = 'SELECT * FROM user';
    return new Promise(function(resolve, reject){
        connection.query(sql, function(err, result){
            resolve(result);
        })
    })
}

function query_todos(email)
{
    const sql_getuserid = 'SELECT * FROM user where email=?';
    const sql_gettodo = 'SELECT * FROM todo where user_id=?';
    return new Promise(function(resolve, reject){
        connection.query(sql_getuserid, [email], function(err, result){
            connection.query(sql_gettodo, [result[0].id], function(error, sqlres){
                resolve(sqlres);
            })
        })
    })
}

function query_id(id)
{
    const sql_getuserid = 'SELECT * FROM user WHERE id=?';
    return new Promise(function(resolve, reject){
        connection.query(sql_getuserid, [id], function(err, result){
            resolve(result);
        })
    })
}

function query_email(email)
{
    const sql = 'SELECT * FROM user WHERE email=?';

    return new Promise(function(resolve, reject){
        connection.query(sql, [email], function(err, result){
            resolve(result);
        })
    })
}

function query_id_delete(id)
{
    const sql = 'DELETE FROM user WHERE id=?';

    return new Promise(function(resolve, reject){
        connection.query(sql, [id], function(err, result){
            resolve();
        })
    })
}

function query_user_put(email, password, firstname, name, id)
{
    const insert_user = 'UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?';
    const sql = 'SELECT * FROM user WHERE id=?';

    return new Promise(function(resolve, reject){
        connection.query(insert_user, [email, password, firstname, name, id], function(err, resu){
            if (err) {
                console.log(err)
            }
            connection.query(sql, [id], function(err, resul){
                resolve(resul);
            })
        })
    })
}

module.exports.query_todos = query_todos;
module.exports.query_user = query_user;
module.exports.query_id = query_id;
module.exports.query_email = query_email;
module.exports.query_id_delete = query_id_delete;
module.exports.check_id = check_id;
module.exports.query_user_put = query_user_put;