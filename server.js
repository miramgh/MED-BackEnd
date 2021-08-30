const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socket = require('socket.io')

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err)
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');



mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const io = socket(server)

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
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
