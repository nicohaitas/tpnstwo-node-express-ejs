var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* JSON NOTES:
----------------------------------------------------------------------------- */
// EJS allows the use of only one json file so merge all files into one
// articleid - This is the global permanent unique system id for each article which never changes once it is created and is used to identify the article globally
// publisheddatetime, commentpublisheddatetime - date time format yyyy-MM-ddThh:mm:sszzz or also known as ISO 8601 format
// leadarticle, breakingnews, happeningnow, happeningnowfeatured, live, promotedarticle, featuredarticle, editorschoice, allowcomments, verifieduser, userreported, articleeditorupvoted, articleupvoted - cast booleans to integers of 0 or 1 before encoding JSON
// reporter1, reporter2 - equal to the meta data Author
// kickerimage - equals to the meta Twitter Image
// Remeber to validate the slug when the user saves it in the Admin remove leading numbers and special characters suchas: ., ... and empty charactor spaces only underscores and dashes are valid
app.locals.data = require('./data.json');

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
