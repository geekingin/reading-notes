var connect=require('connect');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var errorHandler=require('errorhandler');
var serveStatic=require('serve-static');

// console.log(cookieParser);
var app=connect()
	// .use(pre)
	// .use(cookieParser('tobi is a cool ferret'))
	// .use