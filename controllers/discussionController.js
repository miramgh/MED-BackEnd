const Discussion = require('../models/discussionModel');
const Module = require('../models/moduleModel');
const catchAsync = require('../utils/catchAsync');

exports.createDiscussion = catchAsync(async (req, res, next) => {
    const disc = await Discussion.create(req.body);
    const Mod  = await Module.findByIdAndUpdate({_id :req.body.moduleId} , {"descussionId" : disc._id}, {new: true})

    res.status(201).json({
        status: 'success',
        data: {
            disc
        }
    })
})

exports.postAnswer = catchAsync (async (req , res , next )=>{
    const disc = await Discussion.findByIdAndUpdate({"_id" :req.body.discId}, 
         { $push: { a: {"answer": req.body.a ,"aName":req.body.aName , "aId": req.body.aId} } },
        { new: true })
         
        res.status(200).json({
            status:'success',
            data: disc
        })
})