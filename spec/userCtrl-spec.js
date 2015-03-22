'use strict';

var user = require('../server/user/userCtrl.js'),
  userModel = require('../server/user/userModel.js'),
  mongoose = require('mongoose');


describe('userCtrl.js', function () {
  beforeEach(function (done) {
    mongoose.connect('mongodb://localhost/todoTest', function () {
      userModel.remove({}, false).exec(function () {
        done();
      });
    });
  });

  it('works', function () {
    expect(1).toBe(1);
  });

  it('generates keys', function () {
    var oldKey = 'hello',
      newKey = user.genKey(oldKey);

    expect(newKey.length).toBe(128);
  });

  it('gets user ids from keys', function (done) {
    var tKey, tnewKey, tUserId, tNewUserId;

    // Get a brand new key.
    user.getKey('hello', testFirstKey);

    // Test the initial key generation.
    function testFirstKey(err, key) {
      expect(key).not.toBe('hello');
      expect(key).toBeDefined();
      tKey = key;
      user.getID(key, testUserId);
    }

    // Test the user id that comes back from the first key.
    function testUserId(err, userId) {
      expect(userId).toBeDefined();
      tUserId = userId;
      user.getKey(tKey, testSecondKey)
    }

    // Test the second key generated from the first key.
    function testSecondKey(err, newKey) {
      expect(newKey).not.toBe(tKey);
      tnewKey = newKey;
      user.getID(newKey, testSecondUserId);
    }

    // Test that the first user id matches the user id returned from
    // the second key.
    function testSecondUserId(err, newUserId) {
      expect(newUserId.id).toBe(tUserId.id);
      tNewUserId = newUserId;
      done();
    }
    
  });

  it('doesn\'t store initial key attempt', function (done) {
    var initialKey, tFirstKey, tSecondKey, tFirstUserId, tSecondUserId;

    initialKey = 'hello';

    user.getKey(initialKey, testFirstKey);

    function testFirstKey(err, firstKey) {
      tFirstKey = firstKey;
      expect(firstKey).toBeDefined();

      user.getID(firstKey, testFirstUserId);
    }

    function testFirstUserId(err, firstUserId) {
      tFirstUserId = firstUserId;
      expect(firstUserId).toBeDefined();

      user.getKey(initialKey, testSecondKey);
    }

    function testSecondKey(err, secondKey) {
      tSecondKey = secondKey;
      expect(secondKey).toBeDefined();
      expect(secondKey).not.toBe(tFirstKey);

      user.getID(secondKey, testSecondUserId);
    }

    function testSecondUserId(err, secondUserId) {
      tSecondUserId = secondUserId;
      expect(testFirstUserId.id).not.toBe(secondUserId.id);
      done();
    }

  });

});