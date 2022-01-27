const mongoose = require('mongoose');
// const validator = require('validator');

const descussionSchema = new mongoose.Schema(
  {
    moduleId :{
      type: mongoose.SchemaTypes.ObjectId,
      ref:'Module',
      required :[true , 'Course Name is required']

    },
    q: {
      type: String
     
    },
    qId :{
      type: mongoose.SchemaTypes.ObjectId,
      ref:"User"
    },
    qName:{
      type:String,
      required:true
    },
    a :{
      type:[{}]
    }
    
  }
);

/* 
{   moduleId : xxx ,
      "moduleId":"61f01b03cb2b2730786b9823",
    "q":"what is cehalhematoma?", 
    "qId":"60d245014511382184753c13" , 
    "qName":"Mira" ,
     "a":[{name , id , answer}], 
     
}
*/

const Descussion = mongoose.model('Descussion', descussionSchema);

module.exports = Descussion;