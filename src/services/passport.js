const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//user is what had been serialized from passport.use
passport.serializeUser((user, done) => {
  debugger;
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  debugger;
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log('google strategy');
      console.log(profile);
      const extistingUser = await User.findOne({ googleID: profile.id });

      if (extistingUser) {
        //we already have a record with the given profile id
        return done(null, extistingUser);
      }

      //we dont have a user with this ID, make a new record
      const user = await new User({
        googleID: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
      }).save();
      done(null, user);
    }
  )
);
