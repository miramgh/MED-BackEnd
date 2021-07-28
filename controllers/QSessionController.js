const RecentQSession = require('./../models/recentQsessionModel')
const catchAsync = require('./../utils/catchAsync'); 


exports.userRecentQSession = catchAsync(async(req, res) => {
    const QuizResults = await RecentQSession.find(req.query)
    res.status(200).json({
      status: 'success',
      QuizResults
    });
})
  
exports.SubmitQSessionDetails =catchAsync(async (req , res) =>{
    const QuizResult  = await RecentQSession.create(req.body)
    
    res.status(201).json({
      status: 'success',
      QuizResult
    });
})
/*exports.updateQSessionDetais = catchAsync(async (req , res )=>{
    const session = req.body.session
   const Quizresults = await RecentQSession.findByIdAndUpdate(
        { _id: req.body.id }, 
        { $push: { sessions: session } }
   )
        res.status(201).json({
            status : 'success',
            Quizresults
        })
})*/
