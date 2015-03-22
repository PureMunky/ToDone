'use strict';

var user = require('./userModel.js'),
  keyModel = require('./keyModel.js'),
  crypto = require('crypto');

// Returns a new user key and associates it with a user record.
function _getKey(key, cb) {
  var newKey = _genKey();
  _getUserByKey(key, function (err, data) {
    if (data != undefined) {
      _addKeyToUser(data, key, newKey, cb);
    } else {
      user.create({}, function (err, data) {
        _addKeyToUser(data, key, newKey, cb);
      });
    }
  });
}

// Adds a new key to an existing user.
function _addKeyToUser(user, oldKey, keyValue, cb) {
  _saveNewKey(user._id, oldKey, keyValue, function (err, keyData) {
    user.Keys.push(keyData._id);
    user.save(function (err) {
      cb(err, keyValue);
    });
  });
}

// Creates a new key.
function _saveNewKey(ownerId, oldKey, keyValue, cb) {
  keyModel.create({
    _owner: ownerId,
    Value: keyValue,
    GeneratedFrom: oldKey
  }, cb);
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
    if (data) {
      cb(err, data._id);
    } else {
      cb(new Error('Invalid User Key'), null);
    }
  });
}

// Gets a user object by key.
function _getUserByKey(key, cb) {
  keyModel.findOne({ Value: key }).populate('_owner').exec(function (err, data) {
    if (data) {
      user.findOne({ _id: data._owner._id }).exec(cb)
    } else {
      cb(err, null);
    }
  });
}

module.exports.getKey = _getKey;
module.exports.genKey = _genKey;
module.exports.getID = _getID;