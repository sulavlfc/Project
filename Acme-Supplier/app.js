var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var random = require("random-js")(); // uses the nativeMath engine
var qs = require('querystring');

var index = require('./routes/index');
var users = require('./routes/users');


var app = express();

app.set('port', process.env.PORT || 3050);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.post("/acme/api/v45.1/order", function(req,res){
  if (req.method == 'POST') {
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
           var post = qs.parse(jsonString);
          
           
        });
    }
	if (req.query.api_key == "cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6"){
			res.json({ order : { supplier :"Acme" , order_id : random.integer(1000, 9999)}});
	}
	else
			res.sendStatus(400);
});


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
});

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});
module.exports = app;
