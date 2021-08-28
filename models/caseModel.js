const mongoose = require('mongoose');
// const validator = require('validator');

const caseSchema = new mongoose.Schema(
  {
    author :{
      type : String,
      required :[true , 'Something went wrong']

    },
    chapter:{
      type : String,
      required :[true , ' We need you to specify the chapter as we use this to sort acc to chapter'],
      lowercase:true
    },
    scenario: {
      type: String,
      required: [true, 'A case must have a scenario'],
      unique: true,
      trim: true,
      minlength: [50, 'A casescenario name must have more or equal then 50 characters']
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    
    options: {
      type: [String],
      required: [true, 'A case must have an options ']
    },
    solution: {
      type: String,
      required: [true, 'A case must have a solution'],
      lowercase:true
    },
    keywords:{
      type: String,
      required : [true , 'You should highlight the keywords in the case'],
      lowercase:true
       
    },
    
    educationalObjective: {
      type: String,
      trim: true,
      required: [true, 'A case must have an educational objective']
    }
    
  }
);



const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
