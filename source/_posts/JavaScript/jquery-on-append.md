---
title: jQuery插入元素动态绑定事件
date: 2016-08-29 11:53:00
updated: 2017-01-11 16:45:00
categories:
- JavaScript
tags: JavaScript
---
>jQuery on()方法, 在选择元素上绑定一个或多个事件的事件处理函数。  

在jQuery 1.7以及之后的版本，.on()方法 提供绑定事件处理程序所需的所有功能。帮助从旧的jQuery事件方法转换， [.bind()](http://api.jquery.com/bind/), [.delegate()](http://api.jquery.com/delegate/), 和 [.live()](http://api.jquery.com/live/).要删除的.on()绑定的事件，请参阅[.off()](http://api.jquery.com/off/)。  

jQuery on()方法描述如下
```
.on( events [, selector ] [, data ], handler(eventObject) )
```
jquery中绑定事件一般使用bind，或者click，但是这只能是对已经加载好的元素定义事件，那些后来添加插入的元素则需要另行绑定。在1.7版本以前使用live。但是在1.7版本以后推荐使用on。这里介绍jQuery中如何给动态添加的元素绑定事件  
在实际开发中会遇到要给动态生成的html元素绑定触发事件的情况
```html
<div id="testdiv">
  <ul></ul>
</div>

```
需要给`<ul>`里面动态添加的`<li>`标签添加click事件  
```JavaScript
$("#testdiv ul").on("click","li", function() {
     //do something here
 });
```
当事件冒泡到`#testdiv ul`时，检测事件的target，如果与传入的选择符（这里是`li`）匹配，就触发事件，否则不触发。

**一个简单的事件绑定如 `$('button').on('click',function(){});` 与`bind()`无二样。**
