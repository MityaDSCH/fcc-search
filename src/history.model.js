'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var History = new Schema({
  array: Object
});

module.exports = mongoose.model('History', History);
