//For view element, not use for code
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemsSchema = new Schema ({
  postId: String,
  menuName: String,
  price: Number,
  qty: Number,
})

module.exports = mongoose.model('Item', ItemsSchema)