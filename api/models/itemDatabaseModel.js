'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemsSchema = new Schema ({
  title: String,
  price: Number,
  qty: Number,
  note: String
})

module.exports = mongoose.model('Item', ItemSchema)