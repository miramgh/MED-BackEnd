const express = require('express');
const collectionController = require('../controllers/collectionController');
const authController = require('../controllers/authController');

const router = express.Router();
  
router
  .route('/')
  .get(
    authController.protect,
    collectionController.getCollections
  )
  .post( 
    authController.protect , 
    collectionController.createCollection);
router
  .route('/:topic')
  .get(
    authController.protect,
    collectionController.getCollection)

 





module.exports = router;
