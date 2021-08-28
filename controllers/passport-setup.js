const passport = require('passport')
const  GoogleStrategy = require('passport-google-oauth20').Strategy;

// MiddleWare 

passport.use(new GoogleStrategy({
    // Options for google Stategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: "/auth/google/callback"

   // callbackURL: "http://www.example.com/auth/google/callback"

  },
  // passport callback function
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));