var express = require('express');
var passport = require('passport');
var router = express.Router();

var mongoose = require('mongoose');
var Article = mongoose.model('Article');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/login');
}

module.exports = function (app) {
  router.get('/', ensureAuthenticated, function (req, res, next) {    
    Article.find({ accountId: app.locals.account.id}, function (error, articles) {
      if (error) {
        return next(error);
      }

      res.render('articles/list', {
        title: 'Articles',
        articles: articles
      });
    });
  });

  app.use('/articles', router);
};
