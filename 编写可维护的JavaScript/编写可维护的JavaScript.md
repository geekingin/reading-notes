编写可维护的JavaScript

block statement：	块语句
##注释：
- 可能被误认为错误的代码

- 难以理解的代码

- 文档注释
 
	
##单var声明、声明提前：
- 《JavaScript Patterns》

##use strict
- 不要在全局作用域中使用 use strict

##避免使用CSS表达式（CSS expression）

##《高性能网站建设》

##Jquery 
- $(‘#selector').load(url,onCompleteFunc)

##告诉浏览器不是JavaScript脚本从而不执行
- \<script type=“text/x-my-template">\</script>

##Handlebars
这种模板插件会将文本转换为一个函数，从而可以传递参数进去

	template=Handlebars.compile(script.text)
	var html=template({name:’jeff’,age:19})
	
##测试
减少全局变量依赖，可以提高可测试性（单元测试）

《JavaScript Web 富应用开发》第9章

##命名空间
	
	//总的命名空间
	var YourGlobal={
		//传入以点号 “.” 分隔的一个字符串，返回相应的命名空间（如果没有则创建）#!!
		namespace:function(ns){
			var parts=ns.split(‘.’),
				object=this,
				i,len;
			for (i=0,len=parts.length;i<len;i++){
				if (!object[parts[i]){
					object[parts[i])={};
				}
				object=object[parts[i]];
			}
			return object;
		}
	}

	YourGlobal.namespace(“Books.Javascript");
	YourGlobal.Books.Javascript.author=“jeff”;		//blablabla
	YourGlobal.namespace(“Books.Css”).ANewBook={}


##异步模块定义（AMD）
	
	//param1：本模块名称
	//param2：依赖模块列表
	//param3：工厂方法，即本模块具体函数
	define(“module-name”,[“dependency1”,”dependency2”],
		function(dependency1,denpendency2){
			//根据之前的模块做一些事情
			return api;
		}
	})

##RequireJS
	
	require({[“module-name”],function(books){
			//本模块的方法
		}
	})


##隔离应用逻辑

- 应用逻辑：和应用功能相关的代码，而不是用户行为相关的
- 将应用逻辑从所有 事件处理程序 中抽离出来的做法是一种最佳实践。
- 这样对于同一个应用功能，可以通过不同的方法来触发，并且方便测试 不需要模拟事件如点击）


##不要分发事件对象

尽量避免将event事件对象直接传递给应用逻辑处理函数，这样对于解耦更好，对于可测试性也更好

	$(document).on(“click”,function(event){
		handleClick(event);
	});
	//事件处理函数将事件对象进行处理，再将所需参数传递给应用逻辑
	function handleClick(event){
		event.preventDefault();
		event.stopPropagation();
		showDiv(event.clientX,event.clientY);
	}
	//应用逻辑与事件分离，更方便测试和代码复用
	function showDiv(x,y){
		var $(‘div’).css({left:x,right:y})
	}
	

##typeof

是类似于 - + — ++ 的单目运算符

##检测类型
	
- 原始值：string、number、boolean、undefined  
	typeof string/number/boolean/undefined   
	这样用非常安全
	
- 引用类型：Date、Error、自定义类型  
		value instanceof Date/RegExp/Error/自定义类型  
		注意跨帧(frame)检测会出现问题  
		
- 函数：function
		typeof Func===“function”
		非常安全，可以跨帧使用
		
		
- 数组：Array
	鸭式判别： typeof arr.sort===“function”  
		数组是唯一拥有sort方法的对象。  
	Object.prototype.toString.call(value)===“[object Array]”  
		对于所有浏览器适用，可以跨帧  
	Array.isArray(arr)  
		ECMA5方法  


##检测属性
	不好的写法：
		if (object[propertyName]){
			//一些代码
		}
		if (object[propertyName!=null){
			//一些代码
		}
		if (object[propertyName]!=undefined){
			//一些代码
		}
上面这些属性检测，实际上是在检测具体的属性的值，而不是检测属性本身是否存在。

更好的办法是用 in 运算符来检测，它会简单地判断属性是否存在，而不会去读取属性的值
		
		//好的写法：
		var	object={
			count:0,
			related:null	
		}
		if (‘count’ in object){
			//执行代码
		}
		if (object[‘count’]){
			//代码不会执行
		}
如果仅仅检查实例对象的属性，则应该用 object.hasOwnProperty()
		

##错误捕获
	try{
		//some code
	}catch(e){				//e是 Error 类型对象
		handleError(e);
	}


##Object.create()
	Object.create(person,{
		address:’wuhan’,
		school:’hust'
	})
	
Object.create()方法以某个对象作为父亲，创建出子对象，相当于 person.__proto__的语法糖。

第二个参数中的属性和方法会被添加到新的对象中。

##门面模式
	jquery 包装

##项目目录结构
- build/
- - 存放最终构建的文件，在提交的时候该目录（理想下）不应该提交（即交给个人build自己的版本）
- src/
- - 源文件 
- test/
- - （单元）测试文件
- - 一般情况下该文件内的文件要和src内的文件一一对应，以保证单元测试的分隔
- release/
- - 对外发布的版本
- demo/
- - 给别人展示所用
	

##压缩

一般压缩仅适用于基于文本的文件，比如 javascript、html、css……
	
	
	
	
##单词：	
style guideline：			编程风格

code convention：			编码规范

code review：				代码评审

ASI，Automatic Semicolon Insertion：	自动分号插入机制

local variable：			局部变量

Camel Case：				驼峰式大小写

underlying code：			底层代码		underlying 隐含的 潜在的 根本的

self-explanatory：			自解释的

string delimiter：			字符串界定符（"， '）	

fall through：				连续执行（switch 没有break的case会接着执行下一个case  ）

instance property：			实例属性		类的实例的属性，javascript中区别于原型的属性

block-level variable declaration：	块级变量声明

pragma：						编译指令

type coercion：				强制类型转换机制（做==比较的时候）

primitive wrapper types：	原始包装类型	让原始值有对象般的行为

no coupling：				无耦合

predictability：			可预见性

workflow interruption：		打断工作流

shadowed：					遮盖	全局变量被局部变量屏蔽

testability：				可测试性

nondestructively：			非破坏性

AMD,Asynchronous Module Definition：	异步模块定义

internationalization options：	多语种选项

function wrapper：			函数包装器（IIFE的实现）

application logic：			应用逻辑

hardcoded：					写死（配置）

source control：			版本控制

artifacts：					工件

minification：				精简

build system：				构建系统