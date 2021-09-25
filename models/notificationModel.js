const mongoose = require('mongoose');
// const validator = require('validator');

const notificationSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'notification must belong to a user']
    },
    authorName:{
      type : String,
      required :[true , 'authorName is required']
    },
    notification:{
        type: Array
    },
    topic :{
      type: String
    },
    seen: {
        type :Boolean , 
        default : false
    }
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Notifications = mongoose.model('Notifications', notificationSchema);

module.exports = Notifications;
