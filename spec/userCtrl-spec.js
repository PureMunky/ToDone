'use strict';

var user = require('../server/user/userCtrl.js');

describe('userCtrl.js', function () {

  it('works', function () {
    expect(1).toBe(1);
  });

  it('generates keys', function () {
    var oldKey = 'hello',
      newKey = user.genKey(oldKey);

    expect(newKey.length).toBe(128);
  });

  it('gets user ids from keys', function () {
    var key = user.getKey('hello'),
      userId = user.getID(key),
      newKey = user.getKey(key),
      newUserId = user.getID(newKey);

    expect(userId).toBe(newUserId);
  });

});