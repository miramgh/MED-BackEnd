const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors')

const AppError = require('./utils/appError');
const oAuthRouter = require('./routes/oAuthRoutes')
const globalErrorHandler = require('./controllers/errorController');
const caseRouter = require('./routes/caseRoutes');
const userRouter = require('./routes/userRoutes');
const QSessionRouter = require('./routes/QSessionRoutes')
const collectionRouter = require('./routes/collectionRoutes')
const notificationRouter = require('./routes/notificationRoutes')
const learningRouter = require('./routes/learningRoutes')
const passportSetup = require('./controllers/passport-setup')



const app = express();



// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(cors())
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// 3) ROUTES

app.use('/api/cases', caseRouter);
app.use('/api/users', userRouter);
app.use('/api/notification' , notificationRouter)
app.use('/api/recentQSession' , QSessionRouter)
app.use('/api/collections' , collectionRouter)
app.use('/api/fork',learningRouter )
app.use('/api/auth' , oAuthRouter)


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
