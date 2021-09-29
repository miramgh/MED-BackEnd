const express = require('express');
const learningController = require('../controllers/learningController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    learningController.getForkedCollections
  )
  .post( 
    authController.protect , 
    learningController.forkCollections);


module.exports = router;
