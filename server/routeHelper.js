'use strict';

module.exports.resolve = function (res, next) {
  return function (err, post) {
    if (err) return next(err);
    res.json(post);
  }
};