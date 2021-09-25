const Notification = require('../models/notificationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getNotification = catchAsync(async (req, res, next) => {
    if (!req.query){
        return next(new AppError('req query required', 404));
    
    }
    const notification = await Notification.find( req.query)
    
    
    res.status(200).json({
      status :'success',
      data:{
        notification
      }
    })
   
  });

  exports.createNotification = catchAsync(async (req, res, next) => {
    const notification = await Notification.create(req.body)
  
    res.status(200).json({
      status :'success',
      data:{
        notification
      }
    })
   
  });
  exports.deleteNotification = catchAsync(async (req, res, next) => {
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