'use strict';

var express = require('express'),
  router = express.Router(),
  user = require('./userCtrl.js'),
  userModel = require('./userModel.js'),
  rh = require('../routeHelper.js');

router.get('/:key', function (req, res, next) {
  user.getKey(req.params.key, function (err, key) {
    rh.resolve(res, next)(err, { key: key });
  });
});

router.get('/', function (req, res, next) {
  rh.authenticate(req, res, next, function (err, userId) {
    userModel.findOne({ _id: userId }).select('-_id').exec(rh.resolve(res, next));
  });
});

router.put('/', function (req, res, next) {
  rh.authenticate(req, res, next, function (err, userId) {
    userModel.update({ _id: userId }, req.body, rh.resolve(res, next));
  });
});

module.exports = router;