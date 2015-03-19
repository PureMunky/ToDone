'use strict';

var todo = require('../server/todo/todoModel.js');

describe('index.js', function () {

  it('works', function () {
    expect(1).toBe(1);
  });
  
  it('can get todos', function () {
    expect(todo.get).toBeDefined();
  });

  it('gets todos', function () {
    var rtn = todo.get(123);

    expect(rtn.length).toBeGreaterThan(0);
  });

});