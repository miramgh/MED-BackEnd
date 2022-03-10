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
    
    moduleController.getModule
    )
  .patch(
      authController.protect , 
      moduleController.updateModule
    )
  router
    .route('/s')
    .get(
      authController.protect , 
      moduleController.searchModules
    )
  router
    .route('/autoComplete')
    .get(
      authController.protect ,
      moduleController.searchAutoComplete
    )

module.exports = router;