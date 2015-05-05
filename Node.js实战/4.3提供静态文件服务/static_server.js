//#? 目录遍历攻击

var http=require('http');
var parse=require('url').parse;
var join=require('path').join;
var fs=require('fs');

var root=__dirname;						//在一个程序中可以有不同的值，取决于当前文件所在目录
console.log(root);

var server=http.createServer(function(req,res){
	var url=parse(req.url);
	var path=join(root,url.pathname);
	// var stream=fs.createReadStream(path);

	// stream.on('data',function(chunck){
	// 	res.write(chunk);
	// });
	// stream.on('end',function(){
	// 	res.end();
	// });
	
	fs.stat(path,function(err,stat){
		if (err){
			if ('ENOENT'==err.code){
				res.statusCode=404;
				res.end('Not Found');
			}else{
				res.statusCode=500;
				res.end('Internal Server Error');
			}
		}else{
			res.setHeader('Content-Length',stat,size);
			var stream=fs.createReadStream(path);
			stream.pipe(res);
			stream.on('error',function(err){
				res.statusCode=500;
				res.end('Internal Server Error');
			});
		}
	});
}).listen(3000);

