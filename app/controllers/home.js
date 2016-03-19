var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');var breadcrumbs = require('express-breadcrumbs');

module.exports = function (app) {
  app.use('/', router);
  app.use('/', breadcrumbs.setHome({
    name: 'Home',
    url: '/'
  }));
};

router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Generator-Express MVC'
    });
});
