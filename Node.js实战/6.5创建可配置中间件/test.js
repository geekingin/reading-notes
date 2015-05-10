var http=require('http');

http.createServer(function(req,res){
	console.log(req.method);
}).listen(3000);