const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config()
const middlewareRouter = require('./middleware/auth');
const userRouter = require('./routes/user/user');
const todoRouter = require('./routes/todos/todos');
const notFoundRouter = require('./middleware/notFound');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', middlewareRouter);
app.use('/user', userRouter);
app.use('/todo', todoRouter);
app.use(notFoundRouter);


app.get("/", (req, res) => {
    res.send("Hello world\n");
})

app.listen(port, () => {
    console.log("listening on port " + port);
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500)
    res.json({"msg": "internal server error"});
});

module.exports = app;