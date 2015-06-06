var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res) {
	// var items=[];												//千万不要把全局变量写到这里...这是针对每一个请求对应的回调函数，请求结束后会被清空。
																	//所以数据不会被保存，要保存就要写到会回调函数后面。
	switch (req.method) {
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunck) {
				item += chunck;
			});
			req.on('end', function() {
				items.push(item);
				res.end('OK\n');
			});

			break;
		case 'GET':
			var body = items.join('\n');
			var html='<!DOCTYPE html>'
					+'<html lang="en">'
					+'<head>'
					+'<meta charset="UTF-8">'
					+'<title>Document</title>'
					+'</head>'
					+'<body>'

			html+=items.join('\n');
			html+='</body>'
				+'</html>'
			res.setHeader('Content-Length',Buffer.byteLength(body));		//这里Buffer.byteLength是字节长度， body.length得出的时字符长度。两者在对待多字节字符（比如汉字）的时候会不相等
			res.setHeader('Content-Type','text/plain;charset="utf-8"');		
			res.end(body);
			break;
		case 'DELETE': //测试的时候用GET代替 curl http://localhost:3001/[2]
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			if (isNaN(i)) {
				res.statusCode = 400;
				res.end('Invalid item id\n');
			} else if (!items[i]) {
				res.statusCode = 404;
				res.end('item not found\n');
			} else {
				items.splice(i, 1);
				res.end('ok\n');
			}
		case 'PUT': //测试的时候用post代替 curl 'update item' http://localhost:3000/[1]
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunck) {
				item += chunck;
			});
			req.on('end', function() {
				var path = url.parse(req.url).pathname;
				var i = parseInt(path.slice(1), 10);
				if (isNaN(i)) {
					res.statusCode = 400;
					res.end('Invalid Item id\n');
				} else if (!items[i]) {
					res.statusCode = 404;
					res.end('item not found\n');
				} else {
					items[i] = chunck;
					res.write('ok\n');
					res.end(items.join(' ') + '\n');
				}
			});
	}
});
server.listen(3001);