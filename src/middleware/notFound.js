const express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    res.status(404);
    res.json({"msg": "Not found"});
});

module.exports = router;