'use strict';

var todoModel = require('./todoModel.js');

function _save(todo, cb) {
  todoModel.update({ _id: todo._id }, todo, { upsert: true }, function (err, newTask) {
    if (err) { cb(err); }
    todoModel.findOne({ _id: newTask.id }, cb);
  });
}

module.exports.save = _save;