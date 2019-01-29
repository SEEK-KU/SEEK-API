'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema ({
  title: String,
  requesterID: String,
  deliverID: String,
  locationTag: {
    type: String,
    enum: ['โรงอาหารกลาง1(บาร์ใหม่)', 'โรงอาหารกลาง2(บาร์ใหม่กว่า)', 'โรงอาหารคณะวิศวกรรมศาสตร์(บาร์วิศวะ)', 'โรงอาหารคณะวิทยาศาสตร์(บาร์วิทย์)', 'โรงอาหารคณะบริหาร(บาร์บริหาร)', 'โรงอาหารคณะเศรษฐศาสตร์(บาร์เศรษฐศาสตร์)', 'อาคสรจอดรถประตูงามวงศ์วาน1']
   
  },
  status: {
    type: String,
    enum: ['Active', 'Processing', 'Shipping', 'Complete'],
    default: ['Active']
  },
  itemQty: Number,
  tip: Number
})

module.exports = mongoose.model('Order', OrderSchema)