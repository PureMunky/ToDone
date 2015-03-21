var express = require('express');
var router = express.Router();
var todo = require('./todoModel.js');

router.get('/', function (req, res, next) {
  todo.find(_resolve(res, next));
});

router.get('/list/:sort', function (req, res, next) {
  todo.find({}).sort({ title: 1 }).exec(_resolve(res, next));
});

router.get('/:id', function (req, res, next) {
  todo.find({ id: req.params.id }, function (err, data) {
    if (data.length > 0) {
      _resolve(res, next)(err, data);
    } else {
      _resolve(res, next)(err, new todo({
        Title: '',
        RepeatFormula: '',
        Tags: [],
        Contexts: [],
        Description: ''
      }));
    }
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  todo.create(req.body, _resolve(res, next));
});

function _resolve (res, next) {
  return function (err, post) {
    if (err) return next(err);
    res.json(post);
  }
}

module.exports = router;