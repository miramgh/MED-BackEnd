const mongoose = require('mongoose');
// const validator = require('validator');

const recentQsessionSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    },
    id : {
        type :String ,
        required : [true , " where is the fuckin dataaa you wanna submit "]
    },

    chapter : {
        type :String ,
        required : [true , " where is the fuckin dataaa you wanna submit "]
    },
    quizNumber :{
        type : Number ,
        required :  [true , " where is the fuckin dataaa you wanna submit "]
    },
    score : {
      type : Number ,
      required : [true , 'where is the fuckin dataaa you wanna submit']
    },
    timeStamp : {
      type : Date ,
      required : [true , 'please provide the time']
    }
    
  }
);
recentQsessionSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select : 'name'
  });
  next();
});



const RecentQSession = mongoose.model('RecentQSession', recentQsessionSchema);

module.exports = RecentQSession;
