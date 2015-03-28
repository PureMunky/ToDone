﻿'use strict';

var todoModel = require('./todoModel.js'),
  moment = require('moment');

function _save(todo, cb) {
  _processTodo(todo);

  todoModel.update({ _id: todo._id }, todo, { upsert: true }, function (err, newTask) {
    if (err) { cb(err); }
    todoModel.findOne({ _id: newTask.id }, cb);
  });
}

function _processTodo(todo) {
  if (todo.Completed && todo.RepeatFormula) {
    _setRepeat(todo);
  }
}

function _setRepeat(todo) {
  var repeat = _parseRepeat(todo.RepeatFormula),
    start_date = new moment(),
    durationTime;

  switch (repeat.start) {
    case 's':
      // Start Date
      start_date = new moment(todo.StartDate);
      break;
    case 'd':
      // Due Date
      start_date = new moment(todo.DueDate);
      break;
    default:
      // Today
      start_date = new moment();
      break;
  }

  start_date.add(repeat.num, repeat.duration);
  todo.Completed = false;
  todo.DueDate = start_date;
}

function _parseRepeat(repeat) {
  var parts = repeat.split('|'),
    num = parseInt(parts[0]),
    duration = parts[1],
    start = parts[2];

  return {
    num: num,
    duration: duration,
    start: start
  };
}

module.exports.save = _save;