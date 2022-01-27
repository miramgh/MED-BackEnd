const express = require('express')
const discussionController = require('../controllers/discussionController')
const authController = require('../controllers/authController');

const router = express.Router();

router
.route('/')
.post(
    authController.protect,
    discussionController.createDiscussion
)
.patch(
    authController.protect,
    discussionController.postAnswer
)


module.exports = router