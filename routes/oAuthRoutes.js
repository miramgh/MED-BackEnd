const router = require('express').Router()
const passport = require('passport')
const passportSetup = require('./../controllers/passport-setup')


router.get('/google',
passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
    passport.authenticate('google', { 
      failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.

      res.redirect('/');
});

module.exports = router