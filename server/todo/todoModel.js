'use strict';

var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  userId: Number,
  Title: { type: String, required: true },
  RepeatFormula: String,
  DueDate: Date,
  Tags: Array,
  Contexts: Array,
  Description: String
});


module.exports = mongoose.model('Todo', TodoSchema);