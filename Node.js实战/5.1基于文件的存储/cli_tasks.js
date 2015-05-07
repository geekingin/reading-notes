var fs=require('fs');
var path=require('path');
var args=process.argv.splice(2);								//去掉node cli_tasks.js两项参数，只留下后面的参数
var command=args.shift();										//取出第一个参数
var taskDescription=args.join(' ');								//合并剩余的参数

var file=path.join(process.cwd(),'/.tasks');					//根据当前的工作目录解析数据库的相对路径

function loadOrInitializeTaskArray(file,cb){
	fs.exists(file,function(exists){
		var tasks=[];
		if (exists){
			fs.readFile(file,'utf8',function(err,data){
				if (err) throw err;
				var data=data.toString();
				var tasks=JSON.parse(data||'');
				cb(tasks);
			});
		}else{
			cb([]);
		}
		console.log(exists);
	});
}

function listTasks(file){
	loadOrInitializeTaskArray(file,function(tasks){
		for (var i in tasks){
			console.log(tasks[i]);
		}
	});
}

function addTask(file,taskDescription){
	loadOrInitializeTaskArray(file,function(tasks){
		tasks.push(taskDescription);
		storeTasks(file,tasks);
	});
}

function storeTasks(file,tasks){
	fs.writeFile(file,JSON.stringify(tasks),'utf8',function(err){
		if (err) throw err;
		console.log('Saved.');
	});
}

switch (command){
	case 'list':
		listTasks(file);
		break;
	case 'add':
		addTask(file,taskDescription);
		break;
	default:
		console.log('Usage: '+process.argv[0]+'list|add[taskDescription]');
}