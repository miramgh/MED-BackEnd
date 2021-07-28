const Case = require('../models/caseModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getAllChapters = catchAsync(async (req, res, next) => {
  const cases = await Case.find();
  let chapters = []
  cases.forEach(oneCase => {
    chapters.push(oneCase.chapter)
  });

  const set = new Set(chapters)
  chapters =[...set]
  //console.log(chapters)
  // SEND RESPONSE5
  res.status(200).json({
    status: 'success',
    results: cases.length,
    data: {
      chapters
    }
  });
});
exports.getCases = catchAsync(async (req, res, next) => {
  const cases = await Case.find(req.query);


  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: cases.length,
    data: {
      cases
    }
  });
});

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

exports.createCase = catchAsync(async (req, res, next) => {
  
  const newCase = await Case.create(req.body);
  
  console.log(newCase)

  res.status(201).json({
    status: 'success',
    data: {
      case: newCase
    }
  });
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
});


