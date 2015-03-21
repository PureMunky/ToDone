'use strict';

var express = require('express'),
  router = express.Router(),
  user = require('./userCtrl.js'),
  rh = require('../routeHelper.js');

router.get('/:key', function (req, res, next) {
  user.getKey(req.params.key, rh.resolve(res, next));
});

module.exports = router;