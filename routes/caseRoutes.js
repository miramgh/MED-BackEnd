const express = require('express');
const caseController = require('../controllers/caseController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    caseController.getCases
  )
  .post( 
    authController.protect , 
    authController.restrictTo('admin'),
    caseController.createCase);
router
  .route('/chapters')
  .get(
    authController.protect,
    caseController.getAllChapters)



router
  .route('/:id')
  .get(
    authController.protect ,
    caseController.getCase
    )
    
  .patch(
    authController.protect ,
    authController.restrictTo('admin'),
    caseController.updateCase
    
    )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    caseController.deleteCase
  );

module.exports = router;
