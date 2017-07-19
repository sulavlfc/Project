var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');

//routes
var order = require('./routes/order');
var orders = require('./routes/orders');
var customer = require('./routes/customer');
//var mockServer = require('node-mock-server');

var app = express();

app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//mongoose mlab connection
//mongoose.connect('mongodb://sulav:sulav12345@ds135519.mlab.com:35519/centralcascade',{ useMongoClient: true });
//mongoose.connect('mongodb://localhost:27017/centralcascade',{ useMongoClient: true });
mongoose.connect('mongodb://localhost:27017/centralcascade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/order',order);
app.use('/orders',orders);
app.use('/customer_id',customer);
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

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});
module.exports = app;
