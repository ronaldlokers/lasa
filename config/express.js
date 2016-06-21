var bodyParser = require('body-parser');
var breadcrumbs = require('express-breadcrumbs');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
var express = require('express');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var glob = require('glob');
var logger = require('morgan');
var methodOverride = require('method-override');
var passport = require('passport');
var session = require('express-session');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';

  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.engine('.hbs', exphbs({
    layoutsDir: config.root + '/app/views/layouts/',
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: [config.root + '/app/views/partials/']
  }));
  app.set('views', config.root + '/app/views');
  app.set('view engine', '.hbs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(breadcrumbs.init());
  app.use(breadcrumbs.setHome());
  app.use(cookieParser());
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'läsa'
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  require(config.root + '/config/passport')(app, config);

  app.use(function(req, res, next) {
    res.locals.current_path= req.path;
    next();
  });

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, config);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
