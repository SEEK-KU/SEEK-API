'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema ({
  requesterId: String,
  delivererId: String,
  createAt: { type: Date, default: Date.now },
  title: String, 
  location: {
    type: String,
    enum: [
      'โรงอาหารกลาง 1 (บาร์ใหม่)', 'โรงอาหารกลาง 2 (บาร์ใหม่กว่า)', 'โรงอาหารคณะวิศวกรรมศาสตร์ (บาร์วิศวะ)', 
      'โรงอาหารคณะวิทยาศาสตร์ (บาร์วิทย์)', 'โรงอาหารคณะบริหาร (บาร์บริหาร)', 'โรงอาหารคณะเศรษฐศาสตร์ (บาร์เศรษฐศาสตร์)', 
      'คณะวิศวกรรมศาสตร์', 'คณะวิทยาศาสตร์', 'คณะสังคมศาสตร์', 'คณะเกษตร', 'คณะมนุษยศาสตร์', 'คณะบริหารธุรกิจ', 
      'คณะเศรษฐศาสตร์', 'คณะวนศาสตร์', 'คณะประมง', 'คณะสิ่งแวดล้อม', 'คณะอุตสาหกรรมเกษตร', 'คณะสถาปัตยกรรมศาสตร์', 
      'ศูนย์เรียนรวม 1',  'ศูนย์เรียนรวม 2', 'ศูนย์เรียนรวม 3', 'ศูนย์เรียนรวม 4', 'KU Home', 'KU Avenue',
      'สำนักบริการคอมพิวเตอร์', 'สำนักทะเบียนและประมวลผล', 'สำนักหอสมุด', 'ศูนย์หนังสือ มก.', 'สหกรณ์ มก.', 
      'สถานพยาบาล', 'หอพักนิสิตชาย', 'หอพักนิสิตหญิง', 'อาคารจอดรถงามวงศ์วาน 1', 'อาคารจอดรถงามวงศ์วาน 2', 
      'อาคารจักรพันธ์เพ็ญศิริ', 'บัณฑิตวิทยาลัย', 'สนามอินทรีจันทรสถิตย์', 'ปั๊ม ปตท.'
    ]
  },
  storeName: String,
  shippingPoint: String,
  shippingTime: Date,
  status: {
    type: String,
    enum: ['ACTIVE', 'PENDING_UPDATEPRICE', 'PENDING_CONFIRMPRICE', 'ACCEPTED', 'PROCESSING', 'SHIPPING', 'COMPLETED'],
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