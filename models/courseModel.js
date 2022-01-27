const mongoose = require('mongoose');
// const validator = require('validator');

const courseSchema = new mongoose.Schema(
  {
    courseName :{
      type : String,
      required :[true , 'Course Name is required']

    },
    instructorName :{
      type : String,
      required :[true , 'instructor name is required']

    },
    instructorId:{
      type : String,
      required :[true , 'instructor name is required']
    },
    chapters: {
      type: [{}],
      required: [true, 'each object must hold chapter name and array of ids ']
    }
    
  }
);

/* 
 {chapter : neonate ,
    modules [ x , y , z ] => ids when queried we should populate them in the query 
}
*/

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
 