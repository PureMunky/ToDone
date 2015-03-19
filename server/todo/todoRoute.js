var express = require('express');
var router = express.Router();
var todo = require('./todoModel.js');

router.get('/', function (req, res, next) {
  res.json(todo.get(123));
});

module.exports = router;