var horizon = require('./lib/index');
var http=require('http');
var url = require('url');
var log = require('console-log-level')({ level: 'info' });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/download', (req, res)=>{
	var paramsUrl = url.parse(req.url, true).query;
	log.info('URL Video: ' + paramsUrl.youtubeURL);
	
	//var cropParams = {start:'02:15', end:'02:20'}; //Optional
	var cropParams = null;
	
	horizon.download(paramsUrl.youtubeURL, res, null, cropParams, null, true, function(err, e){
		
		if(err) {
			return log.info(err);
		}
		
		if(e === horizon.successType.CONVERSION_FILE_COMPLETE){
			log.info(e);
		}
	});
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

app.listen(3000);
log.info('Server running!');