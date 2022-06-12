var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();

var app = express();
app.use(router);
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

router.get('/fossavr/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/fossavr/index.html'));
});

router.get('/fossavr/Build/:filename',function(req,res){
  var options = { }
  if(req.params.filename.endsWith(".gz")){
    options["headers"] = {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/x-gzip'
    }
  }
  if(req.params.filename.endsWith(".js")){
    options["headers"] = {
      'Content-Type': 'text/javascript'
    }
  }
  res.sendFile(path.join(__dirname+'/public/fossavr/Build/'+req.params.filename), options);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

