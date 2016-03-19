var express = require('express');
var router = express.Router();
var passport = require('passport');

var mongoose = require('mongoose');
var Account = mongoose.model('Account');

module.exports = function (app, config) {
  router.route('/login')
    .post(passport.authenticate('local', {
       failureRedirect: '/login'
     }), function(req, res) {
      //Set the user as global variable
      app.locals.account = req.user;

      res.redirect('/profile');
    })
    .get(function (req, res, next) {
      req.breadcrumbs('Login');
      res.render('login', {
        breadcrumbs: req.breadcrumbs(),
        title: 'the login page'
      });
    });

  router.route('/logout')
    .get(function(req, res) {
      app.locals.account = undefined;

      req.logout();
      res.redirect('/');
  });

  router.route('/profile')
    .all(function (req, res, next) {
        if (!req.user) {
            res.redirect('/login');
        }
        next();
    })
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
          return console.error(error);
          //return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/articles');
        });
      });
    });

  app.use('/', router);
};
