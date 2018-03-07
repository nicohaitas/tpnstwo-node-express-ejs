var helmet = require('helmet');
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

/* Helmet Security
----------------------------------------------------------------------------- */
// Body Parser must appear before Helmet
app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}))
app.post('/report-violation', function (req, res) {
  if (req.body) {
    console.log('CSP Violation: ', req.body);
  } else {
    console.log('CSP Violation: No data received!');
  }
  res.status(204).end();
})
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "http://freegeoip.net/json/", "https://query.yahooapis.com/v1/public/yql", "https://cdn.plyr.io/2.0.16/plyr.svg", "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"],
    scriptSrc: ["'self'", "http://freegeoip.net/json/", "https://query.yahooapis.com/v1/public/yql", "https://cdn.plyr.io/2.0.16/plyr.svg", "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js", "data:"],
    connectSrc: ["http://freegeoip.net/json/", "https://query.yahooapis.com/v1/public/yql", "https://cdn.plyr.io/2.0.16/plyr.svg", "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"],
    fontSrc: ["'self'"],
    objectSrc: ["'self'", "*.youtube.com/", "*.vimeo.com/", "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"],
    mediaSrc: ["'self'", "http://sportfm.live24.gr/sportfm7712", "*.youtube.com/", "*.vimeo.com/"],
    childSrc: ["'none'"],
    reportUri: '/report-violation'
  }
}));
app.use(helmet.frameguard({ action: 'sameorigin' }));
// Uncomment in production when using SSL
//app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noCache());
app.use(helmet.hidePoweredBy());

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
