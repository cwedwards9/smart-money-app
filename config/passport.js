const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Use Local Strategy for email and password authentication
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(user) {
      // If the email credential is not valid, done is invoked with false
      if (!user) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If the password credential is not valid, done is invoked with false
      else if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If the credentials are valid, supply Passport with authenticated user
      return done(null, user);
    });
  }
));



// User (de)serialize methods to keep authentication state across requests

// Tell passport how to serialize the user, or how to store a user in the session
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

// Tell passport how to get a user out of the session
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;