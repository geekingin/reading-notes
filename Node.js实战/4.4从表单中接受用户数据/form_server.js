var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res) {
	console.log(req);
	if ('/' == req.url) { //url是个单纯的字符串，是 host:port 之后的那一部分。
		switch (req.method) {
			case 'GET':
				show(res);
				break;
			case 'POST':
				add(req, res);
				break;
			default:
				badRequest(res);
		}
	} else {
		notFound(res);
	}
}).listen(3000);


function show(res) {
	var html = '<!DOCTYPE html>' + '<html lang="en">' + '<head>' + '<meta charset="UTF-8">' + '<title>ToDoList</title>' + '</head>' + '<body>' + '<h1>todo list</h1>' + '<ul>' 
			+ items.map(function(item) {
				return '<li>' + item + '</li>';
			}).join('') 
			+ '</ul>' + '<form action="/" method="post">' + '<p><input type="text" name="item" /></p>' + '<p><input type="submit" value="add item/"></p>' + '</form>' + '</body>' + '</html>';
	res.setHeader('Content-Type','text/html');
	res.setHeader('Content-Length',Buffer.byteLength(html));
	res.end(html);
}

function notFound(res){
	res.statusCode=404;
	res.setHeader('Content-Type','text/plain');
	res.end('Not Found');
}

function badRequest(res){
	res.statusCode=400;
	res.setHeader('Content-Type','text/plain');
	res.end('Not Found');
}