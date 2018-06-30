'use strict';

var horizon = require('../lib/index');
var http = require('http');
var url  = require('url') ;
var log = require('console-log-level')({ level: 'info' });
const express = require('express');
const app = express();

app.get('/', (req, res)=>{
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.send('byNumbers Youtube2mp3 Server App v1.0');
});

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


app.listen(3000);
log.info('Server running!');
log.info('Put on browser: http://localhost:3000/?youtubeURL=http://youtube.com/watch?v=NEA0BLnpOtg');