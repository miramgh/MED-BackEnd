const Collection = require('../models/collectionModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCollections = catchAsync(async (req, res, next) => {
  const collections = await Collection.find();
  let topics = []
  collections.forEach(oneCollection => {
    topics.push(oneCollection.topic)
  });

  const set = new Set(topics)
  topics =[...set]
  //console.log(chapters)
  // SEND RESPONSE5
  res.status(200).json({
    status: 'success',
    results: cases.length,
    data: {
        topics
    }
  });
});
exports.getCollections = catchAsync(async (req, res, next) => {
  const collection = await Collection.find(req.query);


  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    
    data: {
        collection
    }
  });
});

exports.getCollection = catchAsync(async (req, res, next) => {
  const oneCollection = await Collection.findById(req.params.topic)

  if (!oneCollection){
    return next(new AppError('No case found with that ID', 404));
  }
  res.status(200).json({
    status :'success',
    data:{
        oneCollection
    }
  })
 
});

exports.createCollection = catchAsync(async (req, res, next) => {

    let collection = await Collection.find({"topic":req.body.topic , "user":req.body.user}) 
    //console.log( "coolllection" + collection)

    if(!collection.length  ){
        console.log('no items here')
        const newCollection = await Collection.create(req.body);
        return res.status(201).json({
            status: 'success',
            data: {
              newCollection
            }
          });
    }else{
     
        //console.log(req.body.cases)
        //console.log(collection[0])
        const newCases = collection[0].cases.concat(req.body.cases)
        //console.log(newCases)
      

       const newCollection = await Collection.findByIdAndUpdate({_id : collection[0]._id}, {cases:newCases}, {new: true}, function(err, model) {
            if(err){
                console.log(err)
            }else{
              console.log(model)
            }
        })
        res.send(newCollection)
    }

  
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


