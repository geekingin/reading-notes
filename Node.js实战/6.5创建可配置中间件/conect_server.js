// var connect=require('connect');
// var router=require('./middleware/router');
// var routes={
// 	GET:{
// 		'/users':function(req,res){
// 			res.end('tobi,loki,ferret');
// 		},
// 		'/user':function(req,res,id){
// 			res.end('user'+id);
// 		}
// 	},
// 	DELETE:{
// 		'/user/:id':function(req,res,id){
// 			res.end('deleted user '+id);
// 		}
// 	}
// };

// connect()
// 	.use(router(require('./routes/user')))
// 	.use(router(require('./routes/admin')))
// 	.use(function(req,res,next){
// 		console.log(req.method,1111111111);
// 	})
// 	.listen(3000);



//6.5.2
// var connect=require('connect');
// var url=require('url');
// var app=connect()
// 		.use(rewrite)
// 		.use(showPost)
// 		.listen(3000);


// function rewrite(req,res,next){
// 	var path=url.parse(req.url).pathname;
// 	var match=path.match(/^\/blog\/posts\/(.+)/);
// 	console.log(match);
// 	if (match){
// 		req.url+=1;
// 		next();
// 	}else{
// 		next();
// 	}
// }

// function showPost(req,res){
// 	console.log(req.url);
// }




//6.6.1
var connect=require('connect');
connect()
	.use(function hello(req,res,next){
		foo();
		res.setHeader('Content-Type','text/plain');
		res.end('hello world');
		next();
	})
	.use(errorHandler())
	.listen(3000);

function errorHandler(){
	var env=process.env.NODE_ENV||'development';
	return function (err,req,res,next){
		console.log(env);
		res.statusCode=500;
		switch(env){
			case 'development':
				res.setHeader('Content-Type','applicatoin/json');
				res.end(JSON.stringify(err));
				console.log(err);
				break;
			default:
				res.end('Server error');
		}
	}
}



//6.6.3
var api=connect()
	.use(users)
	.use(pets)
	.use(errorHandler);

var app=connect()
	.use(hello)
	.use('/api',api)
	.use(errorPage)
	.listen(3000);

function hello(req,res,next){
	if (req.url.match(/^\/hello/)){
		res.end('Hello world\n');
	}else{
		next();
	}
}

var db = {
	users: [{
		name: 'tobi'
	}, {
		name: 'loki'
	}, {
		name: 'jane'
	}]
};

function users(req, res, next) {
	var match=req.url.match(/^\/user\/(.+)/);
	if (match){
		var user=db.users[match[1]];
		if (user){
			res.setHeader('Content-Type','applicatoin/json');
			res.end(JSON.stringify(user));
		}else{
			var err=new Error('User not found');
			err.notFound=true;
			next(err);
		}
	}else{
		next();
	}
}

function pets(req,res,next){
	if (req.url.match(/^\/pet\/(.+)/)){
		foo();
	}else{
		next();
	}
}

function errorHandler(err,req,res,next){
	console.error(err.stack);
	res.setHeader('Content-Type','applicatoin/json');
	if (err.notFound){
		res.statusCode=404;
		res.end(JSON.stringify({error:err.message}));
	}else{
		res.statusCode=500;
		res.end(JSON.stringify({error:'Internal server error'}));
	}
}