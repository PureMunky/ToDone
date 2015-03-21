'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TagSchema = new Schema({
  Title: String,
  Type: Number
});

module.exports = mongoose.model('Tag', TagSchema);