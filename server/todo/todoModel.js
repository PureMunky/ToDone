'use strict';

var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  due_date: Date,
  categories: [
      {
        title: String
      }
  ]
});

module.exports = mongoose.model('Todo', TodoSchema);