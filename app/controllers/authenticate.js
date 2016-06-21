var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var Account = mongoose.model('Account');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect(401, '/login');
}

module.exports = function (app, config) {
  router.route('/login')
    .post(passport.authenticate('local', {
       failureRedirect: 'back',
       failureFlash: true
     }), function(req, res) {
      //Set the user as global variable
      app.locals.account = req.user;

      res.redirect(303, '/profile');
    })
    .get(function (req, res, next) {
      req.breadcrumbs('Login');
      res.render('login', {
        breadcrumbs: req.breadcrumbs(),
        messages: req.flash(),
        title: 'the login page'
      });
    });

  router.route('/logout')
    .get(function(req, res) {
      app.locals.account = undefined;

      req.logout();
      res.redirect(303, '/');
  });

  router.route('/profile')
    .all(ensureAuthenticated)
    .get(function (req, res) {
      req.breadcrumbs('Profile');

      res.render('account/profile', {
        title: 'the profile page'
      });
    });

  router.route('/register')
    .post(function (req, res) {
      Account.register(new Account({ username : req.body.username }), req.body.password, function(error, account) {
        if (error) {
          res.status(400);
          return res.send(error);

        }

        res.redirect(303, '/articles');
      });
    });

  app.use('/', router);
};
