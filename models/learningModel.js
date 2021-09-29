const mongoose = require('mongoose');
// const validator = require('validator');

const userLearningSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'learning must belong to a user']
    },
    authorName:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'learning must belong to a user']
    },
    collectionId:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'learning must belong to a user']
    },
    topic :{
      type: String
    }
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const UserLearning = mongoose.model('UserLearning', userLearningSchema);

module.exports = UserLearning;
