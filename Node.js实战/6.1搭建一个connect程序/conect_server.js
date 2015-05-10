var connect=require('connect');
var app=connect();


app.use(logger)
	.use('/admin',restrict)
	.use('/admin',admin)
	.use(hello)
	.listen(3000);



function logger(req,res,next){
	console.log('%s %s',req.method,req.url);
	next();												//一定要加next()!!!!!!#!!
}

function hello(req,res,next){
	res.setHeader('Content-Type','text/plain');
	res.end('hello world\n');
}

function restrict(req,res,next){
	var authorization=req.headers.authorization;
	console.log(req.headers.authorization);

	if (!authorization) return next(new Error('Unauthorized'));

	console.log(req.headers);

	var parts=authorization.split(' ');
	var scheme=parts[0];
	var auth=new Buffer(parts[1],'base64').toString().split(':');
	console.log(auth);
	var user=auth[0];
	var pass=auth[1];

	// authenticateWithDatabase(user,pass,function(err){
		// if (err) return next(err);
		next();
	// });
}

function admin(req,res,next){
	switch (req.url){
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type','application/json');
			res.end(JSON.stringify(['tobo','loki','jane']));
			break;
	}
}