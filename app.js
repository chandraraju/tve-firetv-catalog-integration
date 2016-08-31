var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//for escaping special characters in the json
var stringEscape = require('jsesc');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Content-Type', 'application/json');
  // Set custom headers for CORSs
  res.header('Access-Control-Allow-Headers', 'device_type,Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
//app.all('/api/v1/*', [require('./middleware/validateRequest')]);
//app.all('/api/v1/:brand/:platform/config', [require('./middleware/authorizeRequest')]);
app.use(require('./middleware/configResolver'));

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var dataLoad = require('./process/catalogProcess');


// Start the server
//app.set('port', process.env.PORT || 3000);
//
//var server = app.listen(app.get('port'), function() {
//  console.log('Express server listening on port ' + server.address().port);
//  console.log(new Date().toISOString());
//});


//module.exports = app;
