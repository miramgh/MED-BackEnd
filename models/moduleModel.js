const mongoose = require('mongoose');
// const validator = require('validator');

const moduleSchema = new mongoose.Schema(
  {
    moduleTopic :{
      type : String,
      required :[true , 'Module topic is required']

    },
    courseId :{
      type : String,
      required :[true , 'courseId is required']

    },
    descussionId:{
      type: mongoose.SchemaTypes.ObjectId,
      ref:'Descussion'
    },
   instructorId:{
      type: mongoose.SchemaTypes.ObjectId,
      ref:'User'
    },
    content: {
      type: [],
      required: [true, 'each object must hold content']
    }
    
  } ,{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/* 
 {  
     moduleTopic : Neonatal resuscitation , 
     courseId : xxxx , 
     descussionId :xxx , 
     content : {
        "video":"https://youtu.be/tvoh0j1tdbc" ,
        "img" :"" ,
        "paragraph":{} ,
        "mcqs":"" ,
        "flashCard":{} ,
        "x-ray" :{"mg" :"","overlay":"" } 
        }
    }
*/

const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;
 
