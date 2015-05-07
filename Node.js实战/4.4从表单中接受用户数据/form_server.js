//4.4.2
var http=require('http');
var formidable=require('formidable');
var util=require('util');

var files=[];
var server=http.createServer(function(req,res){
	switch (req.method){
		case 'GET':
			show(req,res);
			break;
		case 'POST':
			upload(req,res);
			break;
	}
}).listen(3000);

function show(req,res){
	var html=''
			+'<html><head><title>fdfdfd</title></head><body>'
			+'<form action="/" method="post" enctype="multipart/form-data">'
			+'<p><input type="text" name></p>'
			+'<p><input type="file" name="file"></p>'
			+'<p><input type="submit" value="upload"></p>'
			+'</form>'
			+'</body>'
			+'</html>'
	res.setHeader('Content-Type','html/text');
	res.setHeader('Content-Type',Buffer.byteLength(html));
	res.end(html);
}

function upload(req,res){
	if (!isFormData(req)){
		res.statusCode=400;
		res.end('Bad Request: expecting multipart/formdata');
		return ;
	}
	var form=new formidable.IncomingForm();
	console.log(form.uploadDir);
	form.on('field',function(field,value){
		console.log(field,value);
	});
	form.on('file',function(name,file){
		console.log(name);
		files.push([name,file]);
	});
	form.on('end',function(){
		res.setHeader('Content-Type','text/plain');
		res.write('upload complete');
		res.end(util.inspect(files));
	}).on('progress',function(bytesReceived,bytesExpected){
		var percent=Math.floor(bytesReceived/bytesExpected*100);
		console.log(percent);
	});
	form.parse(req);
}

function isFormData(req){
	var type=req.headers['content-type']||'';
	return 0==type.indexOf('multipart/form-data');
}


/* 4.4.1
var http = require('http');
var url = require('url');
var qs=require('querystring');
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

function add(req,res){
	var body='';
	req.setEncoding('utf8');
	req.on('data',function(chunck){
		body+=chunck;
		console.log('chunck: ',chunck);
	});
	req.on('end',function(){
		console.log('body: ',body);
		var obj=qs.parse(body);
		console.log(obj);
		items.push(obj.item);
		show(res);
	})
}
*/