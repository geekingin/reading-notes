##脚本位置
现代浏览器允许并行下载JavaScript，JS文件之间不会互相影响，但是下载和执行过程仍会阻断其他资源的下载（如图片）。

##动态脚本
通过DOM，可以引用、穿件、删除、移动<script>标签。
	
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

属性名		|		被替换的属性
----		|		-------
children	|		childNodes