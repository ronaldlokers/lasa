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
  res.redirect(401, '/login');
}

module.exports = function (app) {
  router.route('/')
    .all(ensureAuthenticated)
    .get(function (req, res) {
      res.render('articles/add', {
        title: 'Add article'
      });
    })
    .post(function (req, res) {
      if (error) {
          return console.log(error);
      }

      var article = new Article({
        description: 'test',
        title: req.body.title,
        hyperlink: req.body.hyperlink,
        isRead: false,
        accountId: app.locals.account.id
      });

      article.save(function (error, article) {
        if (error) {
          return res.render('articles/add', {
            article: article,
            message: error
          });
        }

        res.redirect('/article/' + article._id);
      });
    })
    .put(function(req, res) {
      res.send('Update the article');
    });

  router.get('/:id', function(req, res) {
    Article.findOne({ _id: req.params.id}, function(error, article){
      if (error) {
          return console.log(error);
      }

      res.render('articles/show', {
        article: article
      });
    });
  });

  app.use('/article', router);
};
