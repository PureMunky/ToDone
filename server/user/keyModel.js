'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var KeySchema = new Schema({
  _owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  Created: { type: Date, default: new Date(), required: true },
  LastUsed: { type: Date, default: new Date(), required: true },
  Value: { type: String, required: true },
  GeneratedFrom: { type: String, required: true }
});

module.exports = mongoose.model('Key', KeySchema);