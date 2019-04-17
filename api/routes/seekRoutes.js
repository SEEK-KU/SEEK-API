'use strict';
module.exports = function(app) {
  var userController = require('../controllers/userController');
  var orderController = require('../controllers/orderController');

  app.route('/users')
  .get(userController.getAllUsers)

  app.route('/user')
    .post(userController.createNewUser)
    .put(userController.updateUserInfo)
    .delete(userController.deleteUserById)
    .get(userController.getUserById)

  app.route('/user/history')
    .get(userController.getHistory)
    
  app.route('/order')
  .post(orderController.createNewOrder) 

  app.route('/order/status/:status')
    .get(orderController.getOrderByStatus)

  app.route('/order/:orderId')
    .get(orderController.getOrderInfo)
    .put(orderController.updateOrderInfo)
    .delete(orderController.deleteOrderById)
   
  app.route('/uploadSlip')
    .put(orderController.uploadPaymentSlip)
  
  app.route('/feed')
    .get(orderController.getNewfeed)

  // app.route('/authen')
  //   .get(userController.getAuthen)

  app.route('/login')
    .post(userController.loginByNontri)

  app.route('/getUserQR')
    .get(userController.getUserQR)
}