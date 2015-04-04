'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var tagActionSchema = new Schema({
  Trigger: String,
  Do: String,
  FromTag: { type: Schema.Types.ObjectId, ref: 'Tag' },
  ToTag: { type: Schema.Types.ObjectId, ref: 'Tag' }
});


module.exports = mongoose.model('TagAction', tagActionSchema);