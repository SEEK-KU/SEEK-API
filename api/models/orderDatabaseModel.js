'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema ({
  postId: String,
  requesterId: String,
  delivererId: String,
  createAt: { type: Date, default: Date.now },
  title: String, 
  location: {
    type: String,
    enum: ['โรงอาหารกลาง1(บาร์ใหม่)', 'โรงอาหารกลาง2(บาร์ใหม่กว่า)', 'โรงอาหารคณะวิศวกรรมศาสตร์(บาร์วิศวะ)', 'โรงอาหารคณะวิทยาศาสตร์(บาร์วิทย์)', 'โรงอาหารคณะบริหาร(บาร์บริหาร)', 'โรงอาหารคณะเศรษฐศาสตร์(บาร์เศรษฐศาสตร์)', 'อาคสรจอดรถประตูงามวงศ์วาน1']
   
  },
  storeName: String,
  shippingPoint: String,
  shippingTime: Date,
  status: {
    type: String,
    enum: ['ACTIVE', 'ARCHIVED', 'PENDING', 'ACCEPTED', 'PROCESSING', 'SHIPPING', 'COMPLETED'],
    default: ['ACTIVE']
  },
  itemQty: Number,
  itemList:{
    type: Array,
    default: []
  },
  tip: Number,
  slip: String,
  note: String
})

module.exports = mongoose.model('Order', OrderSchema)