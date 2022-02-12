const Course = require('../models/courseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createCourse = catchAsync(async (req, res, next) => {
    
    const course = await Course.create(req.body);
    
    console.log(course)
  
    res.status(201).json({
      status: 'success',
      data: {
        course
      }
    });
  });
  exports.getAllCourses = catchAsync(async (req, res, next) => {
    const courses = await Course.find({"instructorId ":req.query.instructorId});
  
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: {
        courses
      }
    });
  });


  /*
  
  
  exports.getCase = catchAsync(async (req, res, next) => {
    const oneCase = await Case.findById(req.params.id)
  
    if (!oneCase){
      return next(new AppError('No case found with that ID', 404));
    }
    res.status(200).json({
      status :'success',
      data:{
        oneCase
      }
    })
   
  });
  
 
  
  exports.updateCase = catchAsync(async (req, res, next) => {
    const updatedCase = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    if (!updatedCase) {
      return next(new AppError('No case found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        updatedCase
      }
    });
  });
  
  exports.deleteCase = catchAsync(async (req, res, next) => {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
  
    if (!deletedCase) {
      return next(new AppError('No case found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  }); */
  
  