const express = require('express');
const QSessionController = require('../controllers/QSessionController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect , QSessionController.userRecentQSession)
  .post(authController.protect , QSessionController.SubmitQSessionDetails)


module.exports = router;
