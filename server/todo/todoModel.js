﻿'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TodoSchema = new Schema({
  _owner: {type: Schema.Types.ObjectId, ref: 'User'},
  Title: { type: String, required: true },
  RepeatFormula: String,
  DueDate: Date,
  Tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  Contexts: Array,
  Description: String
});

module.exports = mongoose.model('Todo', TodoSchema);