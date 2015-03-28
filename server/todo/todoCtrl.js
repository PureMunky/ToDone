'use strict';

var todoModel = require('./todoModel.js');

function _save(todo, cb) {
  _processTodo(todo);

  todoModel.update({ _id: todo._id }, todo, { upsert: true }, function (err, newTask) {
    if (err) { cb(err); }
    todoModel.findOne({ _id: newTask.id }, cb);
  });
}

function _processTodo(todo) {
  if (todo.Complete && todo.RepeatFormula) {
    _setRepeat(todo);
  }
}

function _setRepeat(todo) {
  var repeat = _parseRepeat(todo.RepeatFormula),
    start_date = {
      month: 0,
      day: 0,
      year: 0
    },
    durationTime;

  console.log(repeat);
  switch (repeat.start) {
    case 's':
      // Start Date
      start_date.month = todo.StartDate.getMonth();
      start_date.day = todo.StartDate.getDate();
      start_date.year = todo.StartDate.getYear();

      break;
    case 'd':
      // Due Date
      start_date.month = todo.DueDate.getMonth();
      start_date.day = todo.DueDate.getDate();
      start_date.year = todo.DueDate.getYear();

      break;
    default:
      // Today
      start_date.month = new Date().getMonth();
      start_date.day = new Date().getDate();
      start_date.year = new Date().getYear();

      break;
  }

  switch (repeat.duration) {
    case 'd':
      start_date.day += repeat.num;
      break;
    case 'w':
      start_date.day += (repeat.num * 7);
      break;
    case 'm':
      start_date.month += repeat.num;
      break;
    case 'y':
      start_date.year += repeat.num;
      break;
  }

  start_date.year += 1900;

  todo.Complete = false;

  todo.DueDate = new Date(start_date.year, start_date.month, start_date.day);
  console.log(start_date);
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