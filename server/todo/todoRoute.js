﻿'use strict';

var express = require('express');
var router = express.Router();
var todo = require('./todoModel.js');
var rh = require('../routeHelper.js');

router.get('/', function (req, res, next) {
  todo.find(rh.resolve(res, next));
});

router.get('/list/:sort', function (req, res, next) {
  todo.find({}).populate('Tags').sort({ title: 1 }).exec(rh.resolve(res, next));
});

router.get('/:id', function (req, res, next) {
  if (req.params.id == -1) {
    rh.resolve(res, next)(null, new todo({
      Title: '',
      RepeatFormula: '',
      Tags: [],
      Contexts: [],
      Description: ''
    }));
  } else {
    todo.findById(req.params.id).populate('Tags').exec(rh.resolve(res, next));
  }
});

router.put('/:id', function (req, res, next) {
  todo.update({ _id: req.params.id }, req.body, rh.resolve(res, next));
});

router.post('/', function (req, res, next) {
  todo.create(req.body, rh.resolve(res, next));
});

module.exports = router;