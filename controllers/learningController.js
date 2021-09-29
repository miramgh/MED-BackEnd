const Learning = require('../models/learningModel')
const catchAsync = require('./../utils/catchAsync'); 


exports.getForkedCollections = catchAsync(async(req, res) => {
    console.log(req.query)
    if(Object.keys(req.query).length === 0){
        return res.status(401).json({
            status: "bad request"
        })
    }
    const QuizResults = await Learning.find(req.query)
    res.status(200).json({
      status: 'success',
      QuizResults
    });
})
  
exports.forkCollections =catchAsync(async (req , res) =>{
    const collectionId  = await Learning.create(req.body)
    
    res.status(201).json({
      status: 'success',
      collectionId
    });
})