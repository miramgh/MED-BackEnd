const UserCourseProgress = require('../models/userCourseProgressModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.enrollOrCreate = catchAsync(async (req, res, next) => {
    const userCourseProgress = await UserCourseProgress.create(req.body)
  
    res.status(200).json({
      status :'success',
      data:{
        userCourseProgress
      }
    })
   
  });
  exports.done = catchAsync(async (req , res , next )=>{
    const done = await UserCourseProgress.updateOne({
      "_id" : req.body.id,
      "progress.moduleId": req.body.moduleId
    },{
     "$set" :{"progress.$.done": "true"}
    })
    res.status(200).json({
      status:'success',
      done:'true'
    })
  })
  exports.getEnrolledCourses =catchAsync(async (req , res , next )=>{
    if(Object.keys(req.query).length === 0){
      return res.status(401).json({
          status: "bad request"
      })
  }
    const myCourses = await UserCourseProgress.find(
      req.query
    )
    res.status(200).send({
      status:'success',
      data: myCourses
    })
  })