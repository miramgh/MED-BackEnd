const Module = require('../models/moduleModel');
const Course = require('../models/courseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createModule = catchAsync(async (req, res, next) => {
    
    const module = await Module.create(req.body);
    
    console.log(module._id)
   
    const course = await Course.findByIdAndUpdate( { _id: module.courseId }, 
        { $push: { chapters: {"topic": module.moduleTopic ,"moduleId":module._id} } },
        { new: true })
   console.log(course)
    res.status(201).json({
      status: 'success',
      data: {
        "module":module,
        "course" :course
      }
    });
  });
  exports.getAllModule = catchAsync(async (req, res, next) => {
    const modules = await Module.find({"_id": req.query._id}).populate("descussionId").exec()
  
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        modules
      }
    });
  });

  exports.updateModule = catchAsync(async (req , res , next )=>{

    const module = await Module.findByIdAndUpdate({"_id":req.body.moduleId} , {"content": req.body.content}, {new:true})
   
    res.status(200).json({
      status :'success', 
      data : module
    })
  })