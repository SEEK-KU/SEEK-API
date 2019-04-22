'use struct';

var jwt = require('jsonwebtoken')

const orderDatabaseModel = require('../models/orderDatabaseModel.js');

var mongoose = require('mongoose'),
  Order = mongoose.model('Order');
  User = mongoose.model('User');

//Find order by status
exports.getOrderByStatus = async function(req, res) {
  var orderByStatus = await Order.find({status: req.params.status}, function(err, order) {
    if (err)
      res.send(err)
  })
  res.json(orderByStatus)
}
exports.getNewfeed = async function(req, res) {
  var activeOrder = await Order.find({status: 'ACTIVE'}, function(err, order) {
    if (err)
      res.send(err) 
  }).sort({createAt: 'desc'})
  
  var feed = []
  for(var i=0; i< activeOrder.length; i++) {
    var userInfo
    var orderTemplate = {
      requester: {},
      _id: activeOrder[i]._id,
      title: activeOrder[i].title,
      location: activeOrder[i].location,
      storeName: activeOrder[i].storeName,
      shippingPoint: activeOrder[i].shippingPoint,
      itemList: activeOrder[i].itemList,
      createAt: activeOrder[i].createAt,
      tip: activeOrder[i].tip
    }
    orderTemplate.requester = await User.findOne({stdId: activeOrder[i].requesterId}, 'firstname lastname', function(err, user) {
      if(err)
        res.send(err)
    })

    feed.push(orderTemplate)

  }
  console.log(feed)
  res.json(feed)

}

//Find order info by postId
exports.getOrderInfo = async function(req, res) {
  var orderDetail = {
    orderInfo: {},
    requester: {},
    deliver: {}
  }
  orderDetail.orderInfo = await Order.findOne({_id: req.params.orderId})
  
  orderDetail.requester = await User.findOne({stdId: orderDetail.orderInfo.requesterId})
  
  orderDetail.deliver = await User.findOne({stdId: orderDetail.orderInfo.delivererId})

  res.json(orderDetail)
}

//Create new order
exports.createNewOrder = async function(req, res) {
  var verifyToken = await jwt.verify(req.headers.token, 'seeklovelyshopping', function(err, decoded) {
    if (err) {
      res.send(err)
    }
      return decoded
  })
  var newOrder = new Order(req.body);
  newOrder.requesterId = verifyToken.stdId
  
  var reuturnData = await newOrder.save()
  res.json(reuturnData)
}

//Update order
exports.updateOrderInfo = async function(req, res) {
  let delivererId = ""
  if(req.headers.token) {
    var verifyToken = jwt.verify(req.headers.token, 'seeklovelyshopping', function(err, decoded) {
      if (err) {
        res.send(err)
      }
      return decoded
    })
    delivererId = verifyToken.stdId
  }
  const orderInfo = req.body.orderInfo
  console.log("reqBody", orderInfo)
  const mergedOrderInfo = delivererId ? Object.assign({},orderInfo,{delivererId}) : orderInfo
  console.log(mergedOrderInfo)
  var reuturnData = await orderDatabaseModel.findByIdAndUpdate(req.params.orderId, mergedOrderInfo, {new: true})
  res.send(reuturnData)
}

exports.deleteOrderById = async function(req, res) {
  await Order.deleteOne({_id: req.params.orderId})
    res.send("Delete order success!")
  // Order.deleteMany({status: 'ACTIVE'}, function(err, order) {
  //   if(err)
  //     res.send(err)
  //   res.send("Delete order sucess!")
  // });
}

exports.uploadPaymentSlip = async function (req, res) {
  await Order.updateOne({_id: req.body.postId}, {$set: {"slip": req.body.slip}}, function (err, order) {
    if(err)
      res.send(err)
    res.json("success!")
  })
}

exports.updateOrderStatus = async function (req, res) {
  const enumStatus = ['ACTIVE', 'PENDING_UPDATEPRICE', 'PENDING_CONFIRMPRICE', 'ACCEPTED', 'PROCESSING', 'SHIPPING', 'COMPLETED']
  const indexStatus = {
    'ACTIVE': 0,
    'PENDING_UPDATEPRICE': 1,
    'PENDING_CONFIRMPRICE': 2,
    'ACCEPTED': 3,
    'PROCESSING': 4,
    'SHIPPING': 5,
    'COMPLETED': 6
  }

  var newStatus = enumStatus[ indexStatus[req.body.status]+1 ]

  const updatedOrder = await Order.findOneAndUpdate({_id: req.body.postId}, {"status": newStatus}, {new: true})
  res.json(updatedOrder)

}
