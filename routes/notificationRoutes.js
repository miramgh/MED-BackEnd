const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();
  
router
  .route('/')
  .get(
    authController.protect,
    notificationController.getNotification
  ).post(
    authController.protect,
    notificationController.createNotification
  )
 /* .delete(
    authController.protect,
    notificationController.deleteNotification
  )
  */



module.exports = router;
