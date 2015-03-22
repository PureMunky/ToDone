﻿'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TagSchema = new Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'User' },
  Title: String,
  Type: Number,
});

module.exports = mongoose.model('Tag', TagSchema);