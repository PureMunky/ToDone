'use strict';

var user = require('./userModel.js'),
  crypto = require('crypto');

// Returns a new user key and associates it with a user record.
function _getKey(key, cb) {
  var newKey = _genKey();
  _getUserByKey(key, function (err, data) {
    if (data != undefined) {
      data.Keys.push(newKey);
      data.save(function (err, data) {
        cb(err, newKey);
      });
    } else {
      user.create({ Keys: [newKey] }, function (err, data){
        cb(err, newKey);
      });
    }
  });
}

// Generates a new user key.
function _genKey(oldKey) {
  var alg = crypto.createHash('sha512');

  alg.update(JSON.stringify({
    Version: 1,
    pastKey: oldKey,
    timeStamp: new Date()
  }));

  return alg.digest('hex');
}

// Gets the user id for a specified user key.
function _getID(key, cb) {
  _getUserByKey(key, function (err, data) {
    cb(err, data._id);
  });
}

// Gets a user object by key.
function _getUserByKey(key, cb) {
  user.findOne({ Keys: key }, cb);
}

module.exports.getKey = _getKey;
module.exports.genKey = _genKey;
module.exports.getID = _getID;