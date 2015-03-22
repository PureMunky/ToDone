'use strict';

var express = require('express'),
  router = express.Router(),
  user = require('./userCtrl.js'),
  rh = require('../routeHelper.js');

router.get('/:key', function (req, res, next) {
  user.getKey(req.params.key, function (err, key) {
    rh.resolve(res, next)(err, { key: key });
  });
});

module.exports = router;