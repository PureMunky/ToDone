'use strict';

var express = require('express');
var router = express.Router();
var tag = require('./tagModel.js');
var rh = require('../routeHelper.js');

router.get('/', function (req, res, next) {
  rh.authenticate(req, res, next, function (err, userId) {
    tag.find({ _owner: userId }, rh.resolve(res, next));
  });
});

router.get('/type/:typeId', function (req, res, next) {
  rh.authenticate(req, res, next, function (err, userId) {
    tag.find({ _owner: userId, Type: req.params.typeId }, rh.resolve(res, next));
  });
});

router.put('/:id', function (req, res, next) {
  rh.authenticate(req, res, next, function (err, userId) {
    req.body._owner = userId;
    tag.update({ _id: req.params.id, _owner: userId }, req.body, rh.resolve(res, next));
  });
});

router.post('/', function (req, res, next) {
  rh.authenticate(req, res, next, function (err, userId) {
    tag.findOne({ _owner: userId, Title: req.body.Title }).exec(function (err, data) {
      if (data != undefined) {
        rh.resolve(res, next)(null, data);
      } else {
        req.body._owner = userId;
        tag.create(req.body, rh.resolve(res, next));
      }
    });
  });
});

module.exports = router;