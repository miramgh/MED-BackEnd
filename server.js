const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socket = require('socket.io')
const Pusher = require('pusher')

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err)
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const pusher = new Pusher({
  appId: "1268911",
  key: "698e48a90dfc80004aac",
  secret: "2d35b2b12797d60c1495",
  cluster: "mt1",
  useTLS: true
});


mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })
  .then(() => console.log('DB connection successful!'));

  const db = mongoose.connection;
  db.once('open' , ()=>{
    console.log('connection is open')
    const casesCollection = db.collection('cases')
    const collectionsCollection = db.collection('collections')

    const changeStream = casesCollection.watch()
    const collectionsStream =collectionsCollection.watch()


    changeStream.on('change' , (change)=>{
     
      if (change.operationType === 'insert'){
        const caseDetails = change.fullDocument
        pusher.trigger('case' , 'inserted',{
          userid : caseDetails.author,
          name : caseDetails.authorName,
          caseId : caseDetails ._id
        })
      }else{
        console.log('puhser err')
      }
    })
    collectionsStream.on('change' , (change)=>{
     
      if (change.operationType === 'insert'){
        const collectionDetails = change.fullDocument
        pusher.trigger('collection' , 'inserted',{
          userid : collectionDetails.user,
          name : collectionDetails.authorName,
          collectionId : collectionDetails ._id
        })
      }else{
        console.log('puhser err')
      }
    })
  })
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});



/*io.on('connection' ,(socket)=>{
  console.log(socket.id)
  socket.on('added_cases' ,(data)=>{
    socket.join(data)
    console.log('mira added case '+ data)
  })

  socket.on('disconnect' ,()=>{
    console.log('disconected')
  })
})*/

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err)
  server.close(() => {
    process.exit(1);
  });
});
