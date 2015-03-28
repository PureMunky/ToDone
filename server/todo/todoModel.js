'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TodoSchema = new Schema({
  _owner: {type: Schema.Types.ObjectId, ref: 'User', select: false },
  Title: { type: String, required: true },
  RepeatFormula: String,
  DueDate: Date,
  Tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  Contexts: Array,
  Description: String,
  Complete: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);