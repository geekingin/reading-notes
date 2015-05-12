var connect=require('connect');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var errorHandler=require('errorhandler');
var serveStatic=require('serve-static');
var serveIndex=require('serve-index');

// console.log(cookieParser);
var app=connect()
	// .use(pre)
	// .use(cookieParser('tobi is a cool ferret'))
	// .use(bodyParser)
	// .use(connect.limit())
	// .use(function(req,res){
	// 	console.log(req.cookies);
	// 	console.log(req.signedCookies);
	// 	console.log('222222222');
	// 	res.setHeader('Set-cookie','foo=bar;bar=baz');
	// 	console.log('111111');
	// 	res.setHeader('Set-cookie','foo=bar1;bar=baz1');
	// 	// res.end('hello\n');
	// 	setTimeout(function(){
	// 		console.log('fdfd');
	// 	},100);
	// 		next(new Error('something broke'));
	// })
	.use('/pub',serveIndex('./public'))
	.use('/pub',serveStatic('./public'))
	.use(errorHandler())
	.listen(3000);

function pre(req,res,next){
	console.log(req.headers['cookie']);
	console.log(req.cookie);
	next();
}