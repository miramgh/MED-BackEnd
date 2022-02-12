const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post( 
    authController.protect , 
    courseController.createCourse)
  .get(
    authController.protect , 
    courseController.getAllCourses
    )
   

module.exports = router;