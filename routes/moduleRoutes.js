const express = require('express');
const moduleController = require('../controllers/moduleController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post( 
    authController.protect , 
    moduleController.createModule)
  .get(
    authController.protect , 
    moduleController.getAllModule
    )
  .patch(
      authController.protect , 
      moduleController.updateModule
    )

module.exports = router;