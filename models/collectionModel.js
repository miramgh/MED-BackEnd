const mongoose = require('mongoose');
// const validator = require('validator');

const collectionSchema = new mongoose.Schema(
  {
    topic:{
      type : String,
      required :[true , ' We need you to specify the chapter as we use this to sort acc to chapter'],
      lowercase:true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'case must belong to a user']
    },
   
    cases: {
      type: Array
      
    }
    
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
