var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Account = mongoose.model('Account');

module.exports = function (config) {
  // use static authenticate method of model in LocalStrategy
  passport.use(Account.createStrategy());

  // use static serialize and deserialize of model for passport session support
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());
};
