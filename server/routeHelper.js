'use strict';

var user = require('./user/userCtrl.js');

function _resolve (res, next) {
  return function (err, post) {
    if (err) return next(err);
    res.json(post);
  }
}

function _auth (req, res, next, cb) {
  user.getID(req.headers.userkey, function (err, userId) {
    if (err) {
      _resolve(res, next)(err, null);
    } else {
      cb(null, userId);
    }
  });
}

module.exports.resolve = _resolve; 
module.exports.authenticate = _auth;