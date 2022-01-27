const express = require('express');
const userCourseProgressController = require('../controllers/userCourseProgressController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post( 
    authController.protect , 
    userCourseProgressController.enrollOrCreate)
  .patch(
    authController.protect , 
    userCourseProgressController.done
  ).get(
    authController.protect ,
    userCourseProgressController.getEnrolledCourses
  )

module.exports = router;