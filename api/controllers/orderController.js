'use struct';

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
  var activeOrder = await Order.find({status: 'Active'}, function(err, order) {
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
  orderDetail.orderInfo = await Order.findOne({_id: req.params.orderId}, function(err, order) {
    if (err)
      res.send(err)
  })
  
  orderDetail.requester = await User.findOne({stdId: orderDetail.orderInfo.requesterId}, function(err, user) {
    if (err)
      res.send(err)
  })
  
  orderDetail.deliver = await User.findOne({stdId: orderDetail.orderInfo.deliverId}, function(err, user) {
    if (err) 
      res.send(err)
  })

  res.json(orderDetail)
}

//Create new order
exports.createNewOrder = async function(req, res) {
  var newOrder = new Order(req.body);
  var reuturnData = await newOrder.save(function(err, order) {
    if(err)
      res.send(err)
  })
  res.json(reuturnData)
}

//Update order
exports.updateOrderInfo = async function(req, res) {
  var reuturnData = await Order.update({_id: req.params.orderId}, req.body, function (err, order) {
    if(err)
      res.send(err)
  })
  res.send("Order Updated!")
}

exports.deleteOrderById = function(req, res) {
  Order.deleteOne({_id: req.params.orderId}, function(err, order) {
    if(err)
      res.send(err)
    res.send("Delete order sucess!")
  });
  // Order.deleteMany({status: 'Active'}, function(err, order) {
  //   if(err)
  //     res.send(err)
  //   res.send("Delete order sucess!")
  // });
}

