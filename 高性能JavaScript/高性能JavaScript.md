##脚本位置
现代浏览器允许并行下载JavaScript，JS文件之间不会互相影响，但是下载和执行过程仍会阻断其他资源的下载（如图片）。

并且是并行下载，阻塞执行。

##动态脚本
通过DOM，可以引用、穿件、删除、移动\<script>标签。
	
	var script = document.createElement('script');
	script.src='file.js';
	document.body.appendChild(script);
	//or
	document.getL
	

##CSS本身是并行加载的


##无阻塞加载
- loadScript
- YUI3的方式
- LazyLoad类库
- LABjs

##管理作用域

JS引擎（非现代）在访问全局作用域的变量时开销要大于访问局部作用域的变量，所以使用全局作用域的变量越少，性能大致上越好。

并且，如果某个 全局变量 需要经常访问，可以将其缓存在局部作用域，从而减少开销。

	function useDocument(){
		//**
		var doc=document;
		
		doc.getElementById('');
		doc.xxxxxxxxxxxxx;
		doc.xxxxxxxxxxx;
		doc.xxxxxx;
	}
	
##闭包
闭包指的是被引出局部作用域（函数）的函数/方法，而不是局部作用域（函数）本身。

由于闭包的执行要访问大量跨作用域的标识符，并且外界局部函数的活动对象（acctive object）被曝存在闭包的[[scope]]属性中，所以这些活动对象（即变量的集合）无法被销毁。

这些造成了内存的增加和时间消耗的增大。

内存的增加无法结局，但是时间的消耗可以通过将跨作用域的变量存储在局部变量中来解决。

##嵌套成员

location.href 要比 window.location.href 快很多。  

因为location.href 要访问的深度更低。 ##?存疑

在局部作用域访问全局变量的嵌套对象的时候，将对象缓存，会获得更大的性能提升。

> 这也是为什么 zepto 会在最开始缓存这么多变量。

> 另外，缓存的时候针对对象的方法要小心，因为这样会将方法的this对象绑定到window，从而造成可能的错误。除非你能确定（know for sure）你将要使用的目标（就像zepto一样）

##DOM
DOM和JS的实现通常是由不同的部分来进行的。

chrome中 DOM由 WebCore实现与渲染，JS由 V8引擎 实现

这也造成了，每次从JS中访问DOM都会产生性能的损耗（过路费），访问次数越多，损耗越大。

##减少DOM访问次数

尽量将DOM的访问次数减少，尽量将更多的任务留在JS一端。


##减少页面上的DOM访问次数

DOM本身就慢，如果要修改页面上的DOM则会更慢！——重绘与重拍（repaint and reflow）


##节点克隆
克隆一个已经存在的节点要比新建节点快（但是并不明显）

##动态NodeList与静态NodeList（dynamicNodeList and staticNodeList）

getElementsByxxx系列返回的都是动态的Nodelist（dynamic NodeList）  
querySelectorAll(XXX)系列返回的都是静态的NodeList（static NodeList）

动态NodeList由于是文档的实时反应，所以不需要复制节点，而所有的节点（长度）的更新都会反映到动态NodeList上，所以getElementByXXX更快。  
静态NodeList由于是文档的快照，所以需要复制节点，因此querySelectorAll(XXX)更慢。

至少相差十倍。


##数组缓存

将数组的访问缓存起来，也会对性能造成很大的提升。

	//较慢
	var arr=[a,b,c,d,e];
	for (var i = 0;i < arr.length; i++){
		arr[i].xxx;
		xxx=arr[i].length;
		foo(arr[i]);
		arr[i]=bar(arr[i]);
	}	  
	
	//较快
	var arr=[a,b,c,d,e];
	for (var i = 0;i < arr.length; i++){
		var e=arr[i];
		e.xxx;
		xxx=e.length;
		foo(e);
		e=bar(e);
	}
	
##遍历DOM

区分元素节点（HTML标签）和其他节点的DOM属性

属性名					|	被替换的属性
----					|	-------
children				|	childNodes
childElementCount		|	childNodes.length
firstElementChild		|	firstChild
lastElementChild		|	lastChild
nextElementSibling		|	nextSibling
previousElementSibling	|	previousSibilng

前者不单是我们所需要的，而且性能更优

##重绘与重排

###重排
- 添加或删除可见的DOM元素
- 元素位置改变
- 元素尺寸改变（外边距、内边距、边框厚度、宽度、高度）
- 内容改变，如：文本改变或图片被另一个不同尺寸的图片替代
- 页面渲染器初始化
- 浏览器窗口尺寸改变

###重排队列

一般浏览器会队列化修改并批量执行来优化重排过程。然后使用以下属性，可能会（不知不觉）强制刷新队列。

- offsetTop、offsetLeft、offsetWidth、offsetHeight
- scrollTop、scrollLeft、scrollWidth、scrollHeight
- clientTop、clientLeft、clientWidth、clientHeight
- getComputedStyle（）

以上属性需要‘最新‘的布局信息，所以会强制浏览器渲染队列中“待处理变化”的元素重排。

避免在修改样式的时候使用以上属性，从而使得浏览器可以优化性能。

###批量修改DOM
将所有修改操作在 fragment document 里面进行操作，之后再将 fragment的内容添加到document里面。  

值得注意的是，当附加 fragment 到文档中时，被添加的实际上是 fragment 的子结点，而不是 fragment 本身。


> 对于 display：none 的元素，修改属性并不会引起重排

> 对于 position:absolute/fixed 的元素，修改属性只会引起自身的重排。

“离线“操作 DOM

##循环

forEach是 for 循环效率的 1/8

##条件语句

switch比if-else更快：

1. 一方面因为语言优化，对switch采用了branch table（分支表）优化。

2. 另一方面比较值使用全等操作符，不会造成性能损耗

特定switch结构时，可以转换为查找表。


##递归

### 递归转迭代

###记忆化

斐波那契

##字符串链接

	//性能低
	str+=’one‘+'two' 
	
	//性能高
	str=str+'one'+'two'
	
原因是第一个会创建一个临时字符串 ’onetwo‘

##正则表达式

《正则表达式手册》(《regular expression cookbook》)




##浏览器线程

浏览器执行JS和更新用户界面（重绘、重排）的进程是同一个。  
其工作基于一个简单的队列系统，任务会被保存到队列中直到进程空闲。  
队列中的任务要么是js代码，要么是UI更新（重绘与重排）。


###定时器
js的定时器的 时间 参数表示在多长时间之后将回调函数 **加入 队列**，而不是多长时间后 **执行**

如果队列中已经存在一个 setInterval 创建的任务，那么后续任务不会被添加到队列之中。

###分割任务

其基本原理是讲 不需要顺序操作，也不需要同步操作的 数据，用setTimeout进行分割。

例如对于数组的迭代，将大任务分割成小的任务，然后用setTimeout串联

###web workers！



##ajax


- 速度：jsonp > json > xml > html

###手动ajax

	var req=new XMLHttp	Request();
	req.onreadystaechange=function(){
		if (req.readystate==4){
			var data=req.responseText;
			
			var headers=req.getAllResponseHeaders();
		}
	}
	
	req.open('get',url,true);
	req.setRequestHeader('X-request-With','XMLHttpRequest');
	req.send(null);

###过期头 （expires）



###避免双重求值

eval Function() setTimeout setInterval



###延迟加载

复写现有的函数，将执行过的代码、只需要执行一次的代码给移除（通过复写函数的方法）。

	function addHandler(target,eventType,handler){
	
		//特性检测，只需要检测一次
		if (target.addEventListener){			//DOM2type
			//复写现有函数
			addHanlder=function(target.eventType,handler){
				target.addEventListener(eventType,handler,false);
			}
		}else{									//IE
			addHandler=function(target.eventType,handler){
				target.attachEvent("on"+eventType,handler);
			}
		}
		
		
		//调用新函数
		addHandler(target,eventType,handler);
	}
	
	
	
	
##单词

- plus oprator					：加操作符
- plus-equal oprator			：加等操作符
- activation objects			：活动对象
- Agile JavaScript build proces：敏捷 JavaScript 构建过程
- data formats					：数据格式
- data transmission				：数据传输
- performance					：性能
- algorithm						：算法
- conditionals					：条件语句
- loops							：循环
- recursion						：迭代
- alternation					：分支
- backtracking					：回溯
- performance					：性能
- flow							：文档流
- anonymous function			：匿名函数
- expires						：过期时间
- CSS selector					：css选择器
- array joining					：数组项链接
- array processing				：数组处理
- array items					：数组项
- double evaluation				：双重求值
- for-in loops					：for in 循环
- atomic grouping 				：原子组
- backreferences				：反向引用
- emulatiing atomic groups		：模拟原子组
- runaway backtracking			：回溯失控
- batching DOM changes			：批量修改DOM
- beacons						：信标
- benchmarking					：基准测试
- bitmasking					：位掩码
- bitwise operators				：位运算符
- blocking scripts				：阻塞脚本
- Browser Object Model			：浏览器对象模型
- bracket notation				：括号表示法
- dot notation					：点号表示法