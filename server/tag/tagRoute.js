'use strict';

var express = require('express');
var router = express.Router();
var tag = require('./tagModel.js');
var rh = require('../routeHelper.js');

router.get('/', function (req, res, next) {
  tag.find(rh.resolve(res, next));
});

router.get('/type/:typeId', function (req, res, next) {
  tag.find({ Type: req.params.typeId }, rh.resolve(res, next));
});

router.put('/:id', function (req, res, next) {
  tag.findByIdAndUpdate(req.params.id, req.body, rh.resolve(res, next));
});

router.post('/', function (req, res, next) {
  tag.findOne({ Title: req.body.Title }).exec(function (err, data) {
    console.log(data);
    if (data != undefined) {
      rh.resolve(res, next)(null, data);
    } else {
      tag.create(req.body, rh.resolve(res, next));
    }
  });
});

module.exports = router;