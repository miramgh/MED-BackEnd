const mongoose = require('mongoose');
// const validator = require('validator');

const userCourseSchema = new mongoose.Schema(
  {
    userId :{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User',
      required :[true , 'User Id Is Required']

    },
    courseId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Course',
      required :[true , 'course id is required']

    },
    progress:{
      type : [{}]
    }
  }
);

/* 
 {chapter : neonate ,
    modules [ x , y , z ] => ids when queried we should populate them in the query 
}
*/

const UserCourseProgress = mongoose.model('userCourseSchema', userCourseSchema);

module.exports = UserCourseProgress;
 